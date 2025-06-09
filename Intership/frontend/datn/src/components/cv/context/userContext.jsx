import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../context/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // If we already have a user, no need to fetch
        if (user) return;

        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            console.log("🔒 No token found in localStorage");
            setLoading(false);
            return;
        }

        const fetchUser = async () => {
            console.log("👤 Fetching user profile...");
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                console.log("✅ PROFILE RESPONSE:", response.data);
                setUser(response.data);
                console.log("✅ User state updated with profile data");
            } catch (error) {
                console.error("❌ Failed to fetch user profile:", error);
                if (error.response) {
                    console.error("❌ Server response:", error.response.data);
                }
                clearUser();
            } finally {
                setLoading(false);
            }
        };
        
        fetchUser();
    }, [user]);

    const updateUser = (userData) => {
        console.log("🔄 updateUser called with:", userData);
        
        if (!userData) {
            console.error("❌ updateUser called with null/undefined data");
            return;
        }
        
        if (!userData.token) {
            console.error("❌ updateUser: No token in userData");
        } else {
            console.log("🔑 Saving token to localStorage");
            localStorage.setItem("token", userData.token);
        }
        
        console.log("👤 Setting user state");
        setUser(userData);
        setLoading(false);
        
        console.log("✅ User context updated successfully");
    };

    const clearUser = () => {
        console.log("🧹 Clearing user data");
        setUser(null);
        localStorage.removeItem("token");
        console.log("✅ User context cleared");
    };

    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;