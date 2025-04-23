import TinderCard from "react-tinder-card";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";

const SwipeDeck = ({ users }) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(users.length - 1);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  const swiped = (direction, user) => {
    if (direction === "left") {
      handleSendRequest("ignored", user._id);
    } else if (direction === "right") {
      handleSendRequest("interested", user._id);
    }
    setCurrentIndex(prev => prev - 1);
  };

  return (
    <div className="flex justify-center items-center mt-10 relative h-[500px]">
      {users.map((user, index) => (
        <TinderCard
          key={user._id}
          onSwipe={(dir) => swiped(dir, user)}
          preventSwipe={["up", "down"]}
          className="absolute"
        >
          <div className="card bg-base-300 w-72 shadow-lg">
            <figure>
              <img src={user.photoUrl} alt="User" className="h-60 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{user.firstName} {user.lastName}</h2>
              <p>{user.age}, {user.gender}</p>
              <p>{user.about}</p>
            </div>
          </div>
        </TinderCard>
      )).slice(0, currentIndex + 1)}
    </div>
  );
};

export default SwipeDeck;
