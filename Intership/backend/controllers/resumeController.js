import fs from "node:fs";
import path from "node:path";
import Resume from "../models/resumeModel.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// @desc Create a new resume
// @route POST /api/ resumes
// @access Private
const createResume = async (req, res) => {
    try {
        const { title } = req.body;
        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: "",
                fullName: "",
                designation: "",
                summary: "",
            },
            contactInfo: {
                email: "",
                phone: "",
                location: "",
                linkedin: "",
                github: "",
                website: ""
            },
            workExperience: [
                {
                    company: '',
                    role: "",
                    startDate: "",
                    endDate: "",
                    description: ""
                },
            ],
            education: [
                {
                    degree: "",
                    institution: "",
                    startDate: "",
                    endDate: ""
                },
            ],
            skills: [
                {
                    name: "",
                    progress: 0,
                }
            ],
            projects: [
                {
                    title: "",
                    description: "",
                    github: "",
                    liveDemo: "",
                },
            ],
            certifications: [
                {
                    title: "",
                    issuer: "",
                    year: ""
                }
            ],
            languages: [
                {
                    name: "",
                    progress: 0,
                }
            ],
            interests: [""],
        };

        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
        });

        res.status(201).json(newResume);
    } catch (error) {
        res
            .status(500)
            .json({ message: "Failed to create resume", error: error.message });
    }
}


// @desc Get all resumes for logged -in user
// @route GET / api / resumes
// @access Private
const getUserResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1, });
        res.json(resumes);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message });
    }
};

// @desc Get single resume by ID
// @route GET / api / resumes /: id
// @access Private
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        res.json(resume)
    } catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message });
    }
};

// @desc Update a resume
// @route PUT /api/resumes/: id
// @access Private
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!resume) {
            return res.status(404).json({ message: "Resume not found or unauthorized" });
        }

        // Merge updates from req. body into existing resume
        Object.assign(resume, req.body);
        // Save updated resume
        const savedResume = await resume.save();

        res.json(savedResume);
    } catch (error) {
        res.status(500).json({ message: "Failed to create resume", error: error.message });
    };
}

// @desc Delete a resume
// @route DELETE /api/resumes/: id
// @access Private
const deleteResume = async (req, res) => {
    try {
        console.log("==== DELETE RESUME ====");
        console.log("Request params:", req.params);
        console.log("User ID:", req.user._id);

        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!resume) {
            console.log("Resume not found or unauthorized");
            return res.status(404).json({ message: "Resume not found or unauthorized" });
        }

        // Log thông tin resume trước khi xóa
        console.log("Resume found:", resume);

        // Delete thumbnailLink and profilePreviewUrl images from uploads folder
        const uploadsFolder = path.join(__dirname, '..', 'uploads');
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        if (resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            console.log("Deleting thumbnail:", oldThumbnail);
            if (fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail);
                console.log("Thumbnail deleted successfully.");
            } else {
                console.log("Thumbnail file does not exist.");
            }
        }

        if (resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
            console.log("Deleting profile image:", oldProfile);
            if (fs.existsSync(oldProfile)) {
                fs.unlinkSync(oldProfile);
                console.log("Profile image deleted successfully.");
            } else {
                console.log("Profile image file does not exist.");
            }
        }

        const deleted = await Resume.findOneAndDelete({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!deleted) {
            console.log("Failed to delete resume from database.");
            return res.status(404).json({ message: "Resume not found or unauthorized" });
        }

        console.log("Resume deleted successfully.");
        res.json({ message: "Resume deleted successfully" });
    } catch (error) {
        console.error("Error deleting resume:", error);
        res.status(500).json({ message: "Failed to delete resume", error: error.message });
    }
};

export { createResume, getUserResumes, getResumeById, updateResume, deleteResume };