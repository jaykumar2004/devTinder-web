import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";

export default function DevTinderHomepage() {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something Went Wrong!!!");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image Overlay with Phones */}
      <div className="absolute inset-0 opacity-60 bg-gradient-to-b from-black to-transparent">
        {/* We'll use a dark overlay instead of actual phone images */}
      </div>
      {/* Main Content */}
      <div className="relative z-10 w-full">
        {/* Hero Content with Login Form */}
        <div className="flex flex-col items-center justify-center px-4 py-8 md:py-16 text-center">
          <h1 className="text-5xl md:text-8xl font-bold mb-8">
            Start something epic.
          </h1>
          
          {/* Login Form with Border */}
          <div className="w-full max-w-sm bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-600">
            {/* Header / Right Panel Content (on top) */}
            <div className="text-white text-center mb-6">
              <h2 className="text-2xl font-semibold">
                Welcome to DevTinder 👋
              </h2>
              <p className="text-sm text-gray-300">
                Find developer friends. Match. Collaborate. Build.
              </p>
            </div>

            {/* Form Title */}
            <h3 className="text-xl text-white font-bold mb-4 text-center">
              {isLoginForm ? "Login to Your Account" : "Create a New Account"}
            </h3>

            {/* Sign Up Fields */}
            {!isLoginForm && (
              <>
                <label className="block mb-4">
                  <span className="text-sm text-white">First Name</span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full mt-1 px-4 py-2 rounded-md bg-white/10 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-sm text-white">Last Name</span>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full mt-1 px-4 py-2 rounded-md bg-white/10 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                </label>
              </>
            )}

            {/* Email */}
            <label className="block mb-4">
              <span className="text-sm text-white">Email ID</span>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-md bg-white/10 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </label>

            {/* Password */}
            <label className="block mb-4">
              <span className="text-sm text-white">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-md bg-white/10 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </label>

            {/* Error Message */}
            <p className="text-red-400 text-center text-sm mb-4">{error}</p>

            {/* Submit Button */}
            <button
              className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition-all duration-200 mb-4 cursor-pointer"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>

            {/* Toggle */}
            <p
              className="text-sm text-center text-white underline cursor-pointer hover:text-gray-300"
              onClick={() => setIsLoginForm((prev) => !prev)}
            >
              {isLoginForm
                ? "New User? Signup Here"
                : "Already have an account? Login Here"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Phone Grid Mockup - Visual background only */}
      <div className="absolute inset-0 opacity-50">
        {/* This would be where the phone grid is positioned */}
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 text-center text-xs text-gray-400">
        All photos are of models and used for illustrative purposes only
      </div>
    </div>
  );
}