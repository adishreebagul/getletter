import { useState, useEffect } from "react";
import Envelope from "../components/Envelope";
import api from "../api/axios";

export default function Inbox() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await api.get('/messages/private');
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching letters", err);
      }
    }
    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-[#f0ead6] px-4 py-6">
      <h1 className="text-3xl font-serif mb-6 text-center text-[#4b3621]">
        Letters from Friends ✉️
      </h1>
      <div className="flex flex-col space-y-6 mt-4">
        {messages.length === 0 ? (
          <p className="text-[#4b3621] text-center font-serif">
            No letters yet
          </p>
        ) : (
          messages.map(letter => (
            <Envelope key={letter.id} letter={letter} isPrivate />
          ))
        )}
      </div>
    </div>
  );
}
