import { Router } from "express";
import { createResume, getUserResumes, getResumeById, updateResume, deleteResume } from "../controllers/resumeController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import  uploadResumeImages  from "../controllers/uploadimages.js";
import upload from "../middleware/uploadMiddleware.js";

const router = Router();

router.post("/", isAuthenticated, createResume) ; // Create Resume
router.get("/", isAuthenticated, getUserResumes); // Get Resume 
router.get("/:id", isAuthenticated, getResumeById); // Get Resume By ID 
router.put("/:id", isAuthenticated, updateResume); // Update Resume 
router.put("/:id/upload-images", isAuthenticated, upload.fields([{ name: 'thumbnail' }, { name: 'profileImage' }]), uploadResumeImages);
router.delete("/:id", isAuthenticated, deleteResume) // Delete Resume
export default router;