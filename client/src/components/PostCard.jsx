import { useState, useEffect } from "react";
import ReplyList from "./ReplyList";
import ReplyForm from "./ReplyForm";
import api from "../api/axios";

function moodEmoji(mood) {
  const map = {
    calm: "😌",
    happy: "😊",
    sad: "😢",
    vent: "😡",
    thoughtful: "🤔",
    excited: "🤩",
    anxious: "😰",
    grateful: "🙏",
    nostalgic: "🕰️",
    hopeful: "🌱",
  };
  return map[mood] || "";
}

export default function PostCard({ post, onClose, isPrivate }) {
  const [replies, setReplies] = useState([]);

  if (!post) {
    return (
      <div className="mb-6 p-6 bg-[#f5f1e6] border border-[#4b3621] rounded-xl shadow-md font-serif text-center text-[#4b3621]">
        Loading post...
      </div>
    );
  }

  useEffect(() => {
    if (isPrivate) return; 
    async function fetchReplies() {
      try {
        const res = await api.get(`/replies/${post.id}`);
        setReplies(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchReplies();
  }, [post.id, isPrivate]);

  return (
    <div className="relative animate-fade-in mb-6 p-6 bg-[#f5f1e6] border border-[#4b3621] rounded-xl shadow-md font-serif">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#7e3a15] hover:text-[#6b0a0a] font-bold text-lg"
        >
          ✕
        </button>
      )}

      <h3 className="text-[#4b3621] font-bold mb-2">{post.username || "Unknown"}</h3>
      <p className="text-[#4b3621] font-bold mb-2">
        Mood: {post.mood_tag || "Unknown"} {moodEmoji(post.mood_tag)}
      </p>
      <p className="text-[#4b3621] mb-4">{post.content || "No content"}</p>

      {!isPrivate && (
        <>
          <p className="text-[#4b3621] font-semibold mb-2 text-sm sm:text-base uppercase tracking-wider">
            Replies
          </p>
          <ReplyList replies={replies} />
          <ReplyForm postId={post.id} onRepliesUpdate={setReplies} />
        </>
      )}
    </div>
  );
}
