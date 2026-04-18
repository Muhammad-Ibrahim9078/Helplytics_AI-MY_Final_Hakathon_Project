/**
 * Controller to handle successful image uploads to Cloudinary.
 * Multer-storage-cloudinary handles the actual upload before this controller is called.
 */
export const uploadImage = async (req, res) => {
    try {
        // Check if file exists in the request (it should be there if multer succeeded)
        if (!req.file) {
            return res.status(400).send({
                success: false,
                message: "No image file provided or file format not supported"
            });
        }

        // Return the Cloudinary response details
        return res.status(200).send({
            success: true,
            message: "Image uploaded successfully to Cloudinary",
            data: {
                url: req.file.path,       // Direct URL to the image
                publicId: req.file.filename, // Cloudinary unique identifier
                size: req.file.size,      // File size in bytes
                format: req.file.mimetype // File format
            }
        });

    } catch (error) {
        console.error("Cloudinary Controller Error:", error);
        
        let status = 500;
        let errMsg = error.message || "An error occurred during the image upload process.";

        // Basic error mapping
        if (errMsg.includes("cloud_name")) {
            status = 401;
            errMsg = "Cloudinary configuration error. Please check your .env credentials.";
        }

        return res.status(status).send({
            success: false,
            message: errMsg
        });
    }
};
