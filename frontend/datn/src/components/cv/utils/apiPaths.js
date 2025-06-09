export const BASE_URL = "https://do-an-backend-fc47.onrender.com";
// utils/apiPaths.js
export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/v1/user/register", // Signup
        LOGIN: "/api/v1/user/login", // Authenticate user & return JWT token 
        GET_PROFILE: "/api/v1/user/profile", // Get logged-in user details
    },
    RESUME: {
        CREATE: "/api/v1/resume", // POST - Create a new resume
        GET_ALL: "/api/v1/resume", // GET - Get all resumes of logged-in user
        GET_BY_ID: (id) => `/api/v1/resume/${id}`, // GET - Get a specific resume
        UPDATE: (id) => `/api/v1/resume/${id}`, // PUT - Update a resume
        DELETE: (id) => `/api/v1/resume/${id}`, // DELETE - Delete a resume
        UPLOAD_IMAGES: (id) => `/api/v1/resume/${id}/upload-images`, // PUT - Upload Thumbnail and Resume profile image
    },

    IMAGE: {
        UPLOAD_IMAGE: "api/v1/auth/upload-image",
    },
};
