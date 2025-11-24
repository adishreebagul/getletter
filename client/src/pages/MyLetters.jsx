import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Envelope from "../components/Envelope";
import api from "../api/axios";

export default function MyLetters() {
    const [posts, setPosts] = useState([]);
    const [sortOrder, setSortOrder] = useState("newest");
    const [filterMood, setFilterMood] = useState("all");

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMyPosts() {
            try {
                const res = await api.get('/my-posts');
                setPosts(res.data);
            } catch (err) {
                console.error("Error fetching letters", err);
            }
        }
        fetchMyPosts();
    }, []);

    const sortedFilteredPosts = posts
        .filter((post) => filterMood === "all" || post.mood === filterMood)
        .sort((a, b) =>
            sortOrder === "newest"
                ? new Date(b.reveal_at) - new Date(a.reveal_at)
                : new Date(a.reveal_at) - new Date(b.reveal_at)
        );

    return (
        <div className="min-h-screen bg-[#f0ead6] px-4 py-6 sm:px-6">
            <Navbar />

            <h1 className="text-3xl font-serif mt-3 mb-6 text-[#4b3621] text-center">
                My Letters ✉️
            </h1>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="px-4 py-2 bg-[#f5f1e6] border border-[#4b3621] rounded-lg font-serif text-[#4b3621] shadow-sm"
                >
                    <option value="newest">📅 Newest First</option>
                    <option value="oldest">📜 Oldest First</option>
                </select>

                <select
                    value={filterMood}
                    onChange={(e) => setFilterMood(e.target.value)}
                    className="px-4 py-2 bg-[#f5f1e6] border border-[#4b3621] rounded-lg font-serif text-[#4b3621] shadow-sm"
                >
                    <option value="all">🎭 All Moods</option>
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
            </div>

            {sortedFilteredPosts.length === 0 ? (
                <div className="flex flex-col items-center gap-4 mt-8">
                    <button
                        onClick={() => navigate('/new')}
                        className="px-8 py-3 rounded-full shadow-md bg-gradient-to-br 
                        from-[#a33c1e] to-[#7e1a0a] text-[#f5f1e6] font-serif 
                        hover:scale-105 transform transition-transform duration-300 flex 
                        items-center justify-center gap-2"
                    >
                        🕯️ Write a Letter ✍️
                    </button>

                    <p className="text-center text-[#4b3621] font-serif">
                        No letters match your filters.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col space-y-6 mt-4">
                    {sortedFilteredPosts.map((post) => (
                        <Envelope key={post.id} letter={post} />
                    ))}
                </div>
            )}
        </div>
    );
}
