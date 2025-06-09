import fs from "fs";
import path from "path";
import Resume from "../models/resumeModel.js";
import upload from "../middleware/uploadMiddleware.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsFolder = path.join(__dirname, '..', 'uploads');

const uploadResumeImages = async (req, res) => {
    console.log("==== UPLOAD IMAGES ====");
    console.log("req.files:", req.files);
    console.log("req.body:", req.body);
    console.log("params:", req.params);

    try {
        const resumeld = req.params.id;
        const resume = await Resume.findOne({ _id: resumeld, userId: req.user._id });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found or unauthorized" });
        }

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const newThumbnail = req.files?.thumbnail?.[0];
        const newProfileImage = req.files?.profileImage?.[0];

        // If new thumbnail uploaded, delete old one
        if (newThumbnail) {
            if (resume.thumbnailLink) {
                const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
                if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
            }
            resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
        }
        // If new profile image uploaded, delete old one
        // if (newProfileImage && resume.profileInfo?.profilePreviewUrl) {
        if (newProfileImage) {
            if (resume.profileInfo?.profilePreviewUrl) {
                const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
                if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
            }
            resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }
        await resume.save();
        res.status(200).json({
            message: "Images uploaded successfully",
            thumbnailLink: resume.thumbnailLink,
            profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
        });
    } catch (err) {
        console.error("Error uploading images:", err);
        res.status(500).json({ message: "Failed to upload images", error: err.message });
    };
}
export default uploadResumeImages;



