import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Friends() {
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [friends, setFriends] = useState([]);

    async function fetchFriends() {
        try {
            const reqs = await api.get('/friends/requests');
            const frnds = await api.get('/friends');

            setRequests(reqs.data);
            setFriends(frnds.data);
        } catch (err) {
            console.error("Error fetching friends", err);
        }
    }
    async function removeFriend(friendId) {
        try {
            await api.delete(`/friends/delete/${friendId}`)
            setFriends(prev => prev.filter(f => f.id !== friendId))
        }
        catch (err) {
            alert("Error removing friend")
        }
    }

    useEffect(() => {
        fetchFriends();
    }, []);

    async function acceptRequest(id) {
        try {
            await api.post('/friends/accept', { request_id: id });
            fetchFriends();
        } catch (err) {
            console.error("Error removing friend", err);
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center bg-[#f0ead6] px-4">

            <h1 className="text-3xl font-serif mt-6 mb-6 text-[#4b3621] text-center">My Friends 👥</h1>

            <section className="mb-8 w-full max-w-md">

                <h2 className="text-2xl font-serif text-[#4b3621] mb-4">Friend Requests</h2>
                {requests.length === 0 ? (
                    <p className="text-[#4b3621] font-serif text-center">No pending friend requests.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {requests.map(r => (
                            <div key={r.id} className="bg-[#f5f1e6] p-4 rounded-lg shadow-md flex justify-between items-center">
                                <span className="font-serif text-[#4b3621]">{r.username}</span>
                                <button
                                    onClick={() => acceptRequest(r.id)}
                                    className="px-4 py-2 rounded-full shadow-md bg-gradient-to-br 
                         from-[#a33c1e] to-[#7e1a0a] text-[#f5f1e6] font-serif 
                         hover:scale-105 transform transition-transform duration-300"
                                >
                                    Accept
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="w-full max-w-md">
                
                <h2 className="text-2xl font-serif text-[#4b3621] mb-4">Friends</h2>
                {friends.length === 0 ? (
                    <p className="text-[#4b3621] font-serif text-center">You have no friends yet.</p>
                ) : (
                    <div className="flex flex-col gap-4 items-center">


                        {friends.map(f => (
                            <div
                                key={f.id}
                                className="bg-[#f5f1e6] p-4 rounded-lg shadow-md flex justify-between items-center w-full font-serif text-[#4b3621]"
                            >
                                <span>{f.username}</span>
                                <button
                                    onClick={() => removeFriend(f.id)}
                                    className="px-3 py-1 rounded-full shadow-md bg-red-500 text-white text-sm hover:scale-105 transform transition-transform duration-300"
                                >
                                    Remove Friend
                                </button>
                            </div>
                        ))}
                        <button
                    onClick={() => navigate('/messages')}
                    className="px-6 py-3 rounded-full shadow-md bg-gradient-to-br 
                     from-[#4b3621] to-[#7e3a15] text-[#f5f1e6] font-serif 
                     hover:scale-105 transform transition-transform duration-300 mt-6 mb-4"
                >
                    ✉️ Compose Private Letter
                </button>
                    </div>
                )}
            </section>
        </div>)
}
