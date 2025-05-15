import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName, " : ", text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage:
          'url("https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-71d4-622f-a76e-31ed2f7920ec/raw?se=2025-05-13T19%3A50%3A09Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=e9d2f8b1-028a-4cff-8eb1-d0e66fbefcca&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-13T10%3A25%3A43Z&ske=2025-05-14T10%3A25%3A43Z&sks=b&skv=2024-08-04&sig=FjV9BnwFAwAPwkL7uuGZAfh/aoRVwxpZIDQj2xyksGs%3D")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-3/4 h-[70vh] border border-gray-600 m-5 flex flex-col text-white rounded-lg shadow-lg">
        <h1 className="p-5 border-b border-gray-600 text-xl font-semibold">
          Chat
        </h1>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${user.firstName === msg.firstName ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-header font-bold">
                {`${msg.firstName}  ${msg.lastName}`}
                <time className="text-xs opacity-50 ml-2">now</time>
              </div>
              <div className="chat-bubble text-white">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          ))}
        </div>

        <div className="p-5 border-t border-gray-600 flex items-center gap-2">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border border-gray-500 bg-transparent text-white rounded p-2"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="btn btn-secondary text-white font-semibold px-4 py-2 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
