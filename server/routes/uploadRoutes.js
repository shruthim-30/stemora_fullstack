const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `photo-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif|svg\+xml/;
  const mimetype = allowedTypes.test(file.mimetype);
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase().replace('.', ''));

  if (mimetype || ext) {
    return cb(null, true);
  }
  cb(new Error('Only image files (JPG, PNG, WebP, GIF, SVG) are allowed!'));
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter
});

router.post('/', upload.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file uploaded.' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    return res.json({
      success: true,
      message: 'Photo uploaded successfully.',
      url: fileUrl,
      filename: req.file.filename
    });
  } catch (error) {
    console.error('[UPLOAD ERROR]', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
