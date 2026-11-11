
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const db = require('./config/db');
const enquiryRoutes = require('./routes/enquiryRoutes');
const contentRoutes = require('./routes/contentRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();

// GoDaddy assigned port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/upload', uploadRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Stemora Dynamic API',
    version: '1.0.0'
  });
});

// Serve React production build
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');

if (fs.existsSync(clientBuildPath)) {
  console.log('[SERVER] Serving React production build from:', clientBuildPath);

  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api') && !req.path.startsWith('/uploads')) {
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    }
  });
} else {
  console.error('[SERVER] React production build not found:', clientBuildPath);
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err.stack || err);

  res.status(500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

// Start server
async function startServer() {
  try {
    await db.init();

    app.listen(PORT, '0.0.0.0', () => {
      console.log('===============================================');
      console.log('[SERVER] Stemora Backend running');
      console.log('[SERVER] Port:', PORT);
      console.log('[SERVER] Host: 0.0.0.0');
      console.log(`[SERVER] API Health: /api/health`);
      console.log('===============================================');
    });

  } catch (error) {
    console.error('[SERVER STARTUP ERROR]', error);
    process.exit(1);
  }
}

startServer();
