import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import { upload } from "../database/cloudinaryConfig.js";

const router = express.Router();

/**
 * Route to handle image uploads.
 * Use the field name 'image' when sending the file in multipart/form-data.
 */
router.post('/image', upload.single('image'), uploadImage);

export default router;
