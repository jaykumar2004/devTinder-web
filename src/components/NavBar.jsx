import axios from "axios";
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
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-black text-white shadow-lg px-4 py-2">
      <div className="flex-1">
        <Link
          to="/"
          className="text-xl font-bold tracking-wide hover:scale-105 transition-transform duration-200"
        >
         DevTinder
        </Link>
      </div>

      {user && (
        <div className="flex-none flex items-center gap-4">
          <span className="text-sm md:text-base font-semibold text-gray-300">
            Welcome, <span className="text-blue-400">{user.firstName}</span>
          </span>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform duration-200"
            >
              <div className="w-10 rounded-full ring ring-blue-500 ring-offset-base-100 ring-offset-2">
                <img alt="user" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 text-white shadow-lg rounded-box w-52 mt-3 z-[100]"
            >
              <li>
                <Link to="/profile" className="hover:bg-gray-700">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:bg-gray-700">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="hover:bg-gray-700">
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="hover:bg-red-700 text-red-400"
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
