import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import 'dotenv/config';

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Configuration for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_uploads', // Folder where images will be stored
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'], // Allowed image formats
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }] // Optional image resizing
  },
});

// Create Multer instance
export const upload = multer({ storage: storage });
export { cloudinary };
