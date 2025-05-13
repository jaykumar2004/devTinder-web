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
    <div
      className="relative w-full min-h-screen bg-black text-white overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp")',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-transparent"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <div className="flex flex-col items-center justify-center px-4 py-8 md:py-16 text-center">
          <h1 className="text-5xl md:text-8xl font-bold mb-8">
            Start something epic.
          </h1>

          {/* Login / SignUp Card */}
          <div className="w-full max-w-sm bg-black/70 backdrop-blur-md rounded-xl p-6 shadow-2xl border border-gray-600">
            <div className="text-white text-center mb-6">
              <h2 className="text-2xl font-semibold">
                Welcome to DevTinder 👋
              </h2>
              <p className="text-sm text-gray-300">
                Find developer friends. Match. Collaborate. Build.
              </p>
            </div>

            <h3 className="text-xl text-white font-bold mb-4 text-center">
              {isLoginForm ? "Login to Your Account" : "Create a New Account"}
            </h3>

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

            <label className="block mb-4">
              <span className="text-sm text-white">Email ID</span>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-md bg-white/10 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </label>

            <label className="block mb-4">
              <span className="text-sm text-white">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 rounded-md bg-white/10 border border-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              />
            </label>

            <p className="text-red-400 text-center text-sm mb-4">{error}</p>

            <button
              className="w-full bg-white text-black font-semibold py-2 rounded-md hover:bg-gray-200 transition-all duration-200 mb-4 cursor-pointer"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>

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

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 text-center text-xs text-gray-400">
        All photos are of models and used for illustrative purposes only
      </div>
    </div>
  );
}
