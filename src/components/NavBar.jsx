import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="navbar bg-transparent backdrop-blur-md text-white shadow-md px-4 py-2 sticky top-0 z-50">
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-white hover:text-accent transition duration-300"
        >
          <img
            src="https://www.citypng.com/public/uploads/preview/android-mobile-app-new-tinder-logo-701751695134820lblq6cprsr.png"
            alt="Logo"
            className="w-8 h-8"
          />
          DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm md:text-base font-medium text-gray-200">
            Welcome, <span className="text-accent">{user.firstName}</span>
          </span>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:ring hover:ring-accent transition duration-200"
            >
              <div className="w-10 rounded-full overflow-hidden">
                <img alt="User" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-200 text-white rounded-box w-52"
            >
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-base-100 rounded transition duration-200"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="hover:bg-base-100 rounded transition duration-200"
                >
                  Requests
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="hover:bg-base-100 rounded transition duration-200"
                >
                  Connections
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:bg-red-800 rounded transition duration-200"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
