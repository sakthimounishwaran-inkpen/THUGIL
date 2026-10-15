// ==========================================================================
// THUGIL AI Virtual Trial Room - Server API Middleware
// Supports real AI Virtual Try-On APIs (Fashn.ai, Replicate IDM-VTON)
// Secure image handling, trial limits enforcement, and admin lead management
// ==========================================================================

import { db } from './db.js';

// Parse JSON request body helper for native Node / Connect middleware
async function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      // Safeguard max payload size (15MB for high-res photos)
      if (body.length > 15 * 1024 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

export function tryOnApiMiddleware() {
  return async function (req, res, next) {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = url.pathname;

    // Only process /api/tryon and /api/admin/tryon routes
    if (!pathname.startsWith('/api/tryon') && !pathname.startsWith('/api/admin/tryon')) {
      return next();
    }

    try {
      // -------------------------------------------------------------
      // 1. GET /api/tryon/status
      // Check user trial count and AI provider status
      // -------------------------------------------------------------
      if (pathname === '/api/tryon/status' && req.method === 'GET') {
        const clientId = url.searchParams.get('clientId') || 'anonymous_patron';
        const user = db.getUserTrials(clientId);

        const hasFashnKey = Boolean(process.env.FASHN_API_KEY);
        const hasReplicateKey = Boolean(process.env.REPLICATE_API_TOKEN);
        const hasLiveAI = hasFashnKey || hasReplicateKey;

        return sendJson(res, 200, {
          success: true,
          clientId: user.clientId,
          trialsRemaining: user.trialsRemaining,
          totalUsed: user.totalUsed,
          providerConfigured: hasLiveAI,
          providerName: hasFashnKey ? 'Fashn.ai v1' : hasReplicateKey ? 'Replicate (IDM-VTON)' : 'Not Configured',
          supportedCategories: [
            "Women's Wear (Sarees, Lehengas, Gowns, Anarkalis)",
            "Men's Wear (Kurta Sets, Sherwanis, Blazers, Suits, Veshti)",
            "Kids' Wear (Pattu Pavadai, Sherwanis, Frocks)",
            "Unisex & Western Silhouettes"
          ]
        });
      }

      // -------------------------------------------------------------
      // 2. POST /api/tryon/process
      // Execute Real AI Virtual Try-On
      // -------------------------------------------------------------
      if (pathname === '/api/tryon/process' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { clientId, userImage, garmentImage, garmentId, garmentName, category } = body;

        if (!clientId) {
          return sendJson(res, 400, { success: false, error: 'Client identifier is required.' });
        }

        if (!userImage || !garmentImage) {
          return sendJson(res, 400, {
            success: false,
            error: 'Both patron photograph and selected garment image are required.'
          });
        }

        // Check trial balance first
        const user = db.getUserTrials(clientId);
        if (user.trialsRemaining <= 0) {
          return sendJson(res, 403, {
            success: false,
            error: 'TRIAL_LIMIT_EXCEEDED',
            message: 'You have completed your 2 complimentary Royal AI fitting sessions. Please request VIP access below to receive additional credits.',
            trialsRemaining: 0
          });
        }

        const FASHN_API_KEY = process.env.FASHN_API_KEY;
        const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

        // If no external AI keys are configured
        if (!FASHN_API_KEY && !REPLICATE_API_TOKEN) {
          db.logJob({
            clientId,
            garmentId: garmentId || 'unknown',
            garmentName: garmentName || 'THUGIL Couture',
            status: 'failed',
            provider: 'None Configured',
            error: 'AI_PROVIDER_KEY_MISSING'
          });

          return sendJson(res, 503, {
            success: false,
            error: 'AI_CREDENTIALS_MISSING',
            message:
              'THUGIL AI Trial Room engine is installed and awaiting your AI Provider API key (FASHN_API_KEY or REPLICATE_API_TOKEN in .env). Never returning static mockups per quality protocol.',
            setupInstructions:
              'Add FASHN_API_KEY=your_key or REPLICATE_API_TOKEN=your_token to your .env file and restart the server.',
            trialsRemaining: user.trialsRemaining
          });
        }

        // --- Call FASHN.AI Provider if configured ---
        if (FASHN_API_KEY) {
          try {
            const fashnResponse = await fetch('https://api.fashn.ai/v1/run', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${FASHN_API_KEY}`
              },
              body: JSON.stringify({
                model_image: userImage,
                garment_image: garmentImage,
                category: category?.includes('tops') ? 'tops' : category?.includes('bottoms') ? 'bottoms' : 'one-pieces',
                mode: 'balanced',
                nsfw_filter: true
              })
            });

            const fashnData = await fashnResponse.json();

            if (!fashnResponse.ok) {
              throw new Error(fashnData.error || fashnData.message || 'Fashn.ai request failed');
            }

            // Deduct trial credit on success
            const consumption = db.consumeTrial(clientId);
            db.logJob({
              clientId,
              garmentId,
              garmentName,
              status: 'completed',
              provider: 'Fashn.ai'
            });

            return sendJson(res, 200, {
              success: true,
              resultImageUrl: fashnData.output?.[0] || fashnData.image_url,
              jobId: fashnData.id,
              trialsRemaining: consumption.trialsRemaining
            });
          } catch (aiErr) {
            console.error('[AI Try-On Error]', aiErr);
            db.logJob({
              clientId,
              garmentId,
              garmentName,
              status: 'failed',
              provider: 'Fashn.ai',
              error: aiErr.message
            });

            return sendJson(res, 502, {
              success: false,
              error: 'AI_GENERATION_FAILED',
              message: `AI provider returned an error: ${aiErr.message}`
            });
          }
        }

        // --- Call REPLICATE IDM-VTON Provider if configured ---
        if (REPLICATE_API_TOKEN) {
          try {
            const repResponse = await fetch('https://api.replicate.com/v1/predictions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${REPLICATE_API_TOKEN}`
              },
              body: JSON.stringify({
                version: 'c871bb9b046607b680449ecbae55fd8e6d945e0a1948644bf2361b3d021d3ff4',
                input: {
                  human_img: userImage,
                  garm_img: garmentImage,
                  garment_des: garmentName || 'Royal THUGIL Couture'
                }
              })
            });

            const repData = await repResponse.json();
            if (!repResponse.ok) {
              throw new Error(repData.detail || 'Replicate submission failed');
            }

            const consumption = db.consumeTrial(clientId);
            db.logJob({
              clientId,
              garmentId,
              garmentName,
              status: 'completed',
              provider: 'Replicate (IDM-VTON)'
            });

            return sendJson(res, 200, {
              success: true,
              resultImageUrl: repData.output?.[0] || repData.urls?.get,
              jobId: repData.id,
              trialsRemaining: consumption.trialsRemaining
            });
          } catch (aiErr) {
            console.error('[AI Try-On Error]', aiErr);
            db.logJob({
              clientId,
              garmentId,
              garmentName,
              status: 'failed',
              provider: 'Replicate',
              error: aiErr.message
            });

            return sendJson(res, 502, {
              success: false,
              error: 'AI_GENERATION_FAILED',
              message: `Replicate AI error: ${aiErr.message}`
            });
          }
        }
      }

      // -------------------------------------------------------------
      // 3. POST /api/tryon/request-access
      // Customer Lead & VIP Access Request Form
      // -------------------------------------------------------------
      if (pathname === '/api/tryon/request-access' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { clientId, name, mobile, email, preferredCategory, consentGiven } = body;

        if (!name || !mobile || !email) {
          return sendJson(res, 400, {
            success: false,
            error: 'Name, mobile number, and email address are mandatory.'
          });
        }

        if (!consentGiven) {
          return sendJson(res, 400, {
            success: false,
            error: 'Explicit consent is required to process your VIP trial access request.'
          });
        }

        const result = db.createAccessRequest({
          clientId: clientId || 'anonymous_patron',
          name,
          mobile,
          email,
          preferredCategory,
          consentGiven
        });

        return sendJson(res, 200, result);
      }

      // -------------------------------------------------------------
      // 4. GET /api/admin/tryon/overview
      // Admin Metrics, Logs, and Access Requests
      // -------------------------------------------------------------
      if (pathname === '/api/admin/tryon/overview' && req.method === 'GET') {
        const overview = db.getOverview();
        const hasFashnKey = Boolean(process.env.FASHN_API_KEY);
        const hasReplicateKey = Boolean(process.env.REPLICATE_API_TOKEN);

        return sendJson(res, 200, {
          success: true,
          ...overview,
          providerConfig: {
            hasFashnKey,
            hasReplicateKey,
            activeProvider: hasFashnKey ? 'Fashn.ai' : hasReplicateKey ? 'Replicate IDM-VTON' : 'None'
          }
        });
      }

      // -------------------------------------------------------------
      // 5. POST /api/admin/tryon/approve
      // Approve Customer Lead Request and Grant Additional Credits
      // -------------------------------------------------------------
      if (pathname === '/api/admin/tryon/approve' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { requestId, creditsToGrant } = body;

        if (!requestId) {
          return sendJson(res, 400, { success: false, error: 'Request ID is required.' });
        }

        const result = db.approveAccessRequest(requestId, Number(creditsToGrant) || 3);
        return sendJson(res, result.success ? 200 : 404, result);
      }

      // -------------------------------------------------------------
      // 6. POST /api/admin/tryon/grant
      // Directly grant credits to any client
      // -------------------------------------------------------------
      if (pathname === '/api/admin/tryon/grant' && req.method === 'POST') {
        const body = await parseJsonBody(req);
        const { clientId, credits } = body;

        if (!clientId) {
          return sendJson(res, 400, { success: false, error: 'Client ID is required.' });
        }

        const updatedUser = db.grantCredits(clientId, Number(credits) || 2);
        return sendJson(res, 200, { success: true, user: updatedUser });
      }

      // Route not recognized under /api/tryon
      return sendJson(res, 404, { success: false, error: 'API endpoint not found.' });
    } catch (error) {
      console.error('[THUGIL API Middleware Error]', error);
      return sendJson(res, 500, { success: false, error: error.message || 'Internal server error.' });
    }
  };
}
