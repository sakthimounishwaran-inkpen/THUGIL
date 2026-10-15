// ==========================================================================
// THUGIL AI Virtual Trial Room - Persistent Database & Ledger
// Handles trial accounting, customer access requests, and job logs
// ==========================================================================

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const DATA_DIR = path.resolve(process.cwd(), 'server', 'data');
const DB_FILE = path.join(DATA_DIR, 'tryon_db.json');

// Ensure storage directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default schema
const DEFAULT_SCHEMA = {
  users: {
    // [clientId]: { trialsRemaining: 2, totalUsed: 0, createdAt: string, lastActive: string }
  },
  accessRequests: [
    // { id, clientId, name, mobile, email, preferredCategory, consentGiven: true, status: 'pending' | 'approved', grantedCredits: 0, createdAt, approvedAt }
  ],
  jobs: [
    // { id, clientId, garmentId, garmentName, status: 'completed' | 'failed' | 'processing', provider, createdAt, completedAt, error }
  ],
  config: {
    freeTrialLimit: 2,
    defaultGrantedCredits: 3
  }
};

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_SCHEMA, null, 2), 'utf-8');
      return DEFAULT_SCHEMA;
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('[THUGIL DB] Error reading database:', err);
    return DEFAULT_SCHEMA;
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[THUGIL DB] Error writing database:', err);
  }
}

export const db = {
  // Get or initialize user trial record
  getUserTrials(clientId) {
    const data = readDb();
    if (!data.users[clientId]) {
      data.users[clientId] = {
        clientId,
        trialsRemaining: data.config.freeTrialLimit,
        totalUsed: 0,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
      writeDb(data);
    } else {
      data.users[clientId].lastActive = new Date().toISOString();
      writeDb(data);
    }
    return data.users[clientId];
  },

  // Deduct 1 trial credit upon successful generation
  consumeTrial(clientId) {
    const data = readDb();
    const user = data.users[clientId] || {
      clientId,
      trialsRemaining: data.config.freeTrialLimit,
      totalUsed: 0,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    };

    if (user.trialsRemaining <= 0) {
      return { success: false, error: 'Free trial limit reached. Please request VIP trial access.' };
    }

    user.trialsRemaining -= 1;
    user.totalUsed += 1;
    user.lastActive = new Date().toISOString();
    data.users[clientId] = user;
    writeDb(data);

    return { success: true, trialsRemaining: user.trialsRemaining, totalUsed: user.totalUsed };
  },

  // Record customer lead access request when credits are exhausted
  createAccessRequest({ clientId, name, mobile, email, preferredCategory, consentGiven }) {
    const data = readDb();
    const existing = data.accessRequests.find(
      (r) => r.clientId === clientId && r.status === 'pending'
    );

    if (existing) {
      return { success: true, message: 'Your VIP access request is already under royal review.', request: existing };
    }

    const newRequest = {
      id: 'REQ-' + crypto.randomBytes(4).toString('hex').toUpperCase(),
      clientId,
      name: name?.trim(),
      mobile: mobile?.trim(),
      email: email?.trim(),
      preferredCategory: preferredCategory || 'Women’s Wear',
      consentGiven: Boolean(consentGiven),
      status: 'pending',
      grantedCredits: 0,
      createdAt: new Date().toISOString(),
      approvedAt: null
    };

    data.accessRequests.unshift(newRequest);
    writeDb(data);
    return {
      success: true,
      message: 'VIP Atelier Trial access request submitted successfully.',
      request: newRequest,
      requestId: newRequest.id
    };
  },

  // Admin approves request and grants additional trial credits
  approveAccessRequest(requestId, creditsToGrant = 3) {
    const data = readDb();
    const request = data.accessRequests.find((r) => r.id === requestId);
    if (!request) {
      return { success: false, error: 'Request not found.' };
    }

    request.status = 'approved';
    request.grantedCredits = creditsToGrant;
    request.approvedAt = new Date().toISOString();

    if (data.users[request.clientId]) {
      data.users[request.clientId].trialsRemaining += creditsToGrant;
      data.users[request.clientId].lastActive = new Date().toISOString();
    } else {
      data.users[request.clientId] = {
        clientId: request.clientId,
        trialsRemaining: creditsToGrant,
        totalUsed: 0,
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString()
      };
    }

    writeDb(data);
    return { success: true, request, user: data.users[request.clientId] };
  },

  // Admin directly grants credits to any clientId
  grantCredits(clientId, credits = 2) {
    const data = readDb();
    const user = this.getUserTrials(clientId);
    user.trialsRemaining += credits;
    data.users[clientId] = user;
    writeDb(data);
    return user;
  },

  // Record an AI generation job
  logJob({ clientId, garmentId, garmentName, status, provider, error = null }) {
    const data = readDb();
    const job = {
      id: 'JOB-' + crypto.randomBytes(5).toString('hex').toUpperCase(),
      clientId,
      garmentId,
      garmentName,
      status, // 'completed' | 'failed' | 'processing'
      provider: provider || 'Fashn.ai / IDM-VTON',
      error,
      timestamp: new Date().toISOString()
    };
    data.jobs.unshift(job);
    // keep max 200 jobs
    if (data.jobs.length > 200) data.jobs = data.jobs.slice(0, 200);
    writeDb(data);
    return job;
  },

  // Admin overview stats
  getOverview() {
    const data = readDb();
    const totalUsers = Object.keys(data.users).length;
    const totalJobs = data.jobs.length;
    const completedJobs = data.jobs.filter((j) => j.status === 'completed').length;
    const failedJobs = data.jobs.filter((j) => j.status === 'failed').length;
    const pendingRequests = data.accessRequests.filter((r) => r.status === 'pending').length;
    const approvedRequests = data.accessRequests.filter((r) => r.status === 'approved').length;

    const stats = {
      totalJobs,
      completedJobs,
      failedJobs,
      pendingRequests,
      approvedRequests,
      activeUsers: totalUsers
    };

    return {
      stats,
      totalUsers,
      totalJobs,
      successfulJobs: completedJobs,
      completedJobs,
      failedJobs,
      pendingRequests,
      approvedRequests,
      accessRequests: data.accessRequests,
      jobs: data.jobs.slice(0, 50),
      recentJobs: data.jobs.slice(0, 20)
    };
  }
};
