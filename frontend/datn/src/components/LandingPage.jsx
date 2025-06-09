import React, { useContext } from "react";
import IMAGE1 from "../components/cv/assets/image1.jpeg"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/Signup";
import Modal from "../components/cv/component/Modal";
import { UserContext } from "../components/cv/context/userContext";
import ProfileInfoCard from "../components/cv/component/Card/ProfileInfoCard";
const LandingPage = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");

    const handleCTA = () => {
        if (!user) {
            setOpenAuthModal(true);
        } else {
            navigate("/dashboard");
        }
    };
    return (
        <div className="w-full min-h-full bg-white pb-96">
            <div className="container mx-auto px-4 py-6">
                <header className="flex justify-between items-center mb-16">
                    <div className="text-xl font-bold">ResumeBuilder</div>
                    {user ? <ProfileInfoCard /> : <button
                        className="bg-purple-100 text-sm font-semibold text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer "
                        onClick={() => setOpenAuthModal(true)}
                    >
                        Login/SignUp
                    </button>}
                </header>

                {/* // hero content */}
                <div className="flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
                        <h1 className="text-5xl font-bold mb-6 leading-tight">
                            Build your {""}
                            <span className=" bg-clip-text bg-[radial-gradient(circle, _#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                                Resume Effortlessly
                            </span>
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">
                            craft a standout resume in minutes with our resume builder
                        </p>
                        <button
                            className="bg-black text-sm font-semibold text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                            onClick={handleCTA}
                        > Get started </button>
                    </div>
                    <div className="w-full md:w-1/2">
                        <img
                            src={IMAGE1}
                            alt="Hero image"
                            className="flex flex-col md:flex-row items-center"
                        />
                    </div>
                </div>

                <section className="mt-5">
                    <h2 className="text-2xl font-bold text-center mb-12">
                        Features that make you shine
                    </h2>
                    <div className="grid gird-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                            <h3 className="text-lg font-semibold mb-3" >edit easy</h3>
                            <p className="text-gray-600">update your resume sections with live preview and instant formating</p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                            <h3 className="text-lg font-semibold mb-3" >
                                beautiful templates
                            </h3>
                            <p className="text-gray-600">
                                choose your modern, profession templates that are easy to customize
                            </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition">
                            <h3 className="text-lg font-semibold mb-3" > One-click Export</h3>
                            <p className="text-gray-600"> download your resume instantly as a high-quality PDF with one-click</p>
                        </div>
                    </div>
                </section>
            </div>
            <div className="text-sm bg-gray-50 text-secondary text-center p-5 mt-5">
                Made with love... Happy Coding
            </div>

            <Modal
                isOpen={openAuthModal}
                onClose={() => {
                    setOpenAuthModal(false);
                    setCurrentPage("login");
                }}
                hideHeader
            >
                <div className="">
                    {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
                    {currentPage === "signup" && (
                        <SignUp setCurrentPage={setCurrentPage} />
                    )}
                </div>

            </Modal>
        </div>
    )
}

export default LandingPage