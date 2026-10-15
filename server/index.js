// ==========================================================================
// Standalone Node.js HTTP Server for Production Deployments
// ==========================================================================

import http from 'node:http';
import { tryOnApiMiddleware } from './apiMiddleware.js';

const PORT = process.env.PORT || 3001;
const middleware = tryOnApiMiddleware();

const server = http.createServer((req, res) => {
  // Enable CORS for local testing
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  middleware(req, res, () => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Endpoint not found.' }));
  });
});

server.listen(PORT, () => {
  console.log(`[THUGIL API Server] Running on http://localhost:${PORT}`);
});
