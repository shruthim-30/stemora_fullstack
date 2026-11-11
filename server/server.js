const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./config/db');
const enquiryRoutes = require('./routes/enquiryRoutes');
const contentRoutes = require('./routes/contentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Stemora Dynamic API',
    version: '1.0.0'
  });
});

// Serve frontend build in production if available (for single-server GoDaddy deployment)
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
const fs = require('fs');
if (fs.existsSync(clientBuildPath)) {
  console.log('[SERVER] Serving React production build from:', clientBuildPath);
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    // Exclude API paths
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    }
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.stack || err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start server after DB init
async function startServer() {
  await db.init();
  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`🚀 Stemora Backend running on port ${PORT}`);
    console.log(`📡 API Health: http://localhost:${PORT}/api/health`);
    console.log(`📁 Uploads:    http://localhost:${PORT}/uploads`);
    console.log(`===============================================`);
  });
}

startServer();
