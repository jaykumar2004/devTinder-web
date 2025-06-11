import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(_id));

    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="flex justify-center my-10 text-white">No Requests Found</h1>;

  return (
    <div className = " text-white min-h-screen mt-0"> {/* Ensured no margin on top */}
      <div className="text-center my-10 px-4">
        <h1 className="text-4xl font-bold">Connection Requests</h1>
      </div>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-6 rounded-lg bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300 w-11/12 sm:w-2/3 md:w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full border-2 border-gray-500"
                src={photoUrl}
              />
            </div>

            <div className="text-left mx-4">
              <h2 className="font-semibold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p className="text-sm text-gray-400">{about}</p>
            </div>

            <div className="flex">
              <button
                className="btn btn-outline-danger mx-2 transition-all hover:bg-red-600 hover:text-white focus:outline-none"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-outline-success mx-2 transition-all hover:bg-green-600 hover:text-white focus:outline-none"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
