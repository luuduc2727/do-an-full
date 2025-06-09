import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"; // nhớ import đúng

const isAuthenticated = async (req, res, next) => {
    try {
        // Lấy token từ cookie hoặc header Authorization
        let token = req.cookies.token;
        if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.userId); // lấy full user

        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }

        req.user = user;       // ✅ Gán cả user
        req.id = user._id;     // ✅ Gán ID riêng nếu cần
        next();

    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "Invalid or expired token",
            success: false
        });
    }
};

export default isAuthenticated;
