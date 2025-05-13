import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const [loading, setLoading] = useState(true);
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
      setLoading(false);
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
        <h1 className="text-white font-bold text-3xl">
          Loading Connections...
        </h1>
        <div className="mt-5">
          <div className="w-1/2 mx-auto p-4 bg-gray-700 rounded-lg animate-pulse"></div>
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
    <div className=" min-h-screen text-white py-10 px-4">
      <h1 className="text-center font-bold text-5xl mb-10">Connections</h1>

      <div className="flex flex-col items-center">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={_id}
              className="flex justify-between m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
            >
              <div className="flex items-center gap-4">
                <img
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover"
                  src={photoUrl}
                />
                <div className="text-left mx-4 ">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  <p className="text-gray-300">
                    {gender}
                    {age ? ` • ${age} yrs` : ""}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">{about}</p>
                </div>
              </div>
              <div className="mt-4 text-right">
                <Link to={`/chat/${_id}`}>
                  <button className="btn btn-primary">Chat</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
