import { useState, useEffect } from "react";
import api from "../api/axios";

function NewLetter({ isPrivate = false }) {
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("calm");
  const [revealAt, setRevealAt] = useState("");
  const [friends, setFriends] = useState([]);
  const [recieverId, setRecieverId] = useState("");

  useEffect(() => {
    if (isPrivate) {
      async function fetchFriends() {
        try {
          const res = await api.get("/friends");
          setFriends(res.data);
        } catch (err) {
          console.error(err);
        }
      }
      fetchFriends();
    }
  }, [isPrivate]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = {
        content,
        mood_tag: mood,
        reveal_at: revealAt.replace("T", " ") + ":00",
      };
      if (isPrivate) payload.reciever_id = recieverId;

      const url = isPrivate ? "/messages" : "/posts";
      await api.post(url, payload);

      alert(isPrivate ? "Private letter sent!" : "Letter posted!");
      setContent("");
      setRevealAt("");
      if (isPrivate) setRecieverId("");
    } catch (err) {
      console.error(err);
      alert("Error sending letter");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4ecd8] to-[#e8d9b3] flex justify-center items-start py-8 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:max-w-lg lg:max-w-xl bg-[#fdf4e3] p-6 sm:p-8 rounded-3xl shadow-2xl border border-[#d6b28f] space-y-6 font-serif backdrop-blur-sm"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-[#4b3621] text-center">
          {isPrivate ? "Compose a Private Letter ✉️" : "Write a Letter ✉️"}
        </h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your thoughts here..."
          className="w-full h-56 sm:h-64 p-4 border border-[#d6b28f] rounded-2xl bg-[#fff6dc] text-base resize-none focus:outline-none focus:ring-2 focus:ring-[#c9a16f] shadow-inner"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="flex-1 p-3 border border-[#d6b28f] rounded-2xl bg-[#fff6dc] text-base focus:outline-none focus:ring-2 focus:ring-[#c9a16f]"
          >
            <option value="calm">😌 Calm</option>
            <option value="happy">😊 Happy</option>
            <option value="sad">😢 Sad</option>
            <option value="vent">😡 Vent</option>
            <option value="thoughtful">🤔 Thoughtful</option>
            <option value="excited">🤩 Excited</option>
            <option value="anxious">😰 Anxious</option>
            <option value="grateful">🙏 Grateful</option>
            <option value="nostalgic">🕰️ Nostalgic</option>
            <option value="hopeful">🌱 Hopeful</option>
          </select>

          {isPrivate && (
            <select
              value={recieverId}
              onChange={(e) => setRecieverId(e.target.value)}
              className="flex-1 p-3 border border-[#d6b28f] rounded-2xl bg-[#fff6dc] text-base focus:outline-none focus:ring-2 focus:ring-[#c9a16f]"
            >
              <option value="">Select a friend</option>
              {friends.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.username}
                </option>
              ))}
            </select>
          )}
        </div>

        <input
          type="datetime-local"
          value={revealAt}
          onChange={(e) => setRevealAt(e.target.value)}
          className="w-full p-3 border border-[#d6b28f] rounded-2xl bg-[#fff6dc] text-base focus:outline-none focus:ring-2 focus:ring-[#c9a16f]"
        />

        <button
          type="submit"
          className={`w-full py-3 rounded-2xl font-serif text-white text-base shadow-md ${
            isPrivate
              ? "bg-gradient-to-br from-[#8b5e3c] to-[#6b4a2e]"
              : "bg-gradient-to-br from-[#a33c1e] to-[#7e1a0a]"
          } hover:scale-105 transform transition-transform duration-200`}
        >
          {isPrivate ? "Send Private Letter" : "Post Letter"}
        </button>
      </form>
    </div>
  );
}

export default NewLetter;
