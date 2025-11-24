import { useState, useEffect } from 'react'
import api from '../api/axios'

export default function Search() {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

    useEffect(() => {
        if (!search.trim()) {
            setResults([])
            return
        }

        const debounce = setTimeout(async () => {
            try {
                const res = await api.get(`users/search?username=${search}`)
                setResults(res.data)
            } catch (err) {
                console.error("Error searching users", err)
            }
        }, 300)

        return () => clearTimeout(debounce)
    }, [search])

    async function sendFriendRequest(userId) {
        try {
            await api.post('/friends/request', { reciever_id: userId })
            alert("Friend request sent!")
            setResults([])
            setSearch("")
        } catch (err) {
            if (err.response?.status === 409) {
                alert(err.response.data.error)
            } else {
                console.error("Error sending friend request", err)
                alert("Failed to send request")
            }
        }
    }

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search friends"
                className="w-full px-3 py-1 rounded-full border border-[#4b3621] focus:outline-none"
            />

            {results.length > 0 && (
                <div className="absolute bg-[#f5f1e6] border border-[#4b3621] rounded-md mt-1 w-full z-10 shadow-md max-h-48 overflow-y-auto">
                    {results.map((user) => (
                        <div
                            key={user.id}
                            className="flex justify-between items-center px-3 py-2 hover:bg-[#e1d9c0] cursor-pointer"
                        >
                            <span className="text-[#4b3621] font-serif">{user.username}</span>
                            <button
                                onClick={() => sendFriendRequest(user.id)}
                                className="px-2 py-1 rounded-full bg-[#a33c1e] text-[#f5f1e6] text-xs hover:bg-[#7e1a0a] transition-colors"
                            >
                                Add
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
