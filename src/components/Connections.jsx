import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-5">
        <h1 className="text-white font-bold text-3xl">Loading Connections...</h1>
        <div className="mt-5">
          {/* Skeleton Loader */}
          <div className="w-1/2 mx-auto p-4 bg-gray-600 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!connections || connections.length === 0) {
    return (
      <h1 className="flex justify-center my-10 text-white text-xl">
        No Connections Found
      </h1>
    );
  }

  return (
    <div className="text-center my-10 px-4">
      <h1 className="text-white font-bold text-5xl mb-8">Your Connections</h1>

      <div className="flex flex-wrap justify-center gap-8">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex flex-col items-center p-6 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 w-full sm:w-80"
            >
              <img
                alt="photo"
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                src={photoUrl}
              />
              <div className="text-center mt-4 text-white">
                <h2 className="font-semibold text-2xl mb-2">
                  {firstName + " " + lastName}
                </h2>
                <p className="text-lg text-gray-200">{gender}</p>
                {age && <p className="text-sm text-gray-300">{age} years old</p>}
                <p className="text-sm text-gray-300 mt-2">{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
