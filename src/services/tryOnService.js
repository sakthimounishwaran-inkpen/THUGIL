// ==========================================================================
// THUGIL AI Virtual Trial Room - Client API Service
// Communicates with backend endpoints for try-on, trial accounting & leads
// ==========================================================================

// Get or generate a persistent unique client ID
export function getOrCreateClientId() {
  try {
    let id = localStorage.getItem('thugil_ai_client_id');
    if (!id) {
      id = 'patron_' + Math.random().toString(36).substring(2, 10) + '_' + Date.now().toString(36);
      localStorage.setItem('thugil_ai_client_id', id);
    }
    return id;
  } catch {
    return 'patron_guest_session';
  }
}

export const tryOnService = {
  // Check trial credits and provider status
  async getStatus() {
    const clientId = getOrCreateClientId();
    const res = await fetch(`/api/tryon/status?clientId=${encodeURIComponent(clientId)}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch trial room status: ${res.statusText}`);
    }
    return await res.json();
  },

  // Submit AI Try-On generation request
  async processTryOn({ userImage, garmentImage, garmentId, garmentName, category }) {
    const clientId = getOrCreateClientId();
    const res = await fetch('/api/tryon/process', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId,
        userImage,
        garmentImage,
        garmentId,
        garmentName,
        category
      })
    });

    const data = await res.json();
    return { ok: res.ok, status: res.status, ...data };
  },

  // Submit customer lead request for additional VIP trial access
  async requestAccess({ name, mobile, email, preferredCategory, consentGiven }) {
    const clientId = getOrCreateClientId();
    const res = await fetch('/api/tryon/request-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientId,
        name,
        mobile,
        email,
        preferredCategory,
        consentGiven
      })
    });

    const data = await res.json();
    return { ok: res.ok, status: res.status, ...data };
  },

  // Admin APIs
  async getAdminOverview() {
    const res = await fetch('/api/admin/tryon/overview');
    if (!res.ok) throw new Error('Admin overview fetch failed');
    return await res.json();
  },

  async approveAccessRequest(requestId, creditsToGrant = 3) {
    const res = await fetch('/api/admin/tryon/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId, creditsToGrant })
    });
    return await res.json();
  },

  async grantDirectCredits(clientId, credits = 2) {
    const res = await fetch('/api/admin/tryon/grant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, credits })
    });
    return await res.json();
  }
};
