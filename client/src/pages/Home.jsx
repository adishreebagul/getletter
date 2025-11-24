import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from '../api/axios'
import Navbar from "../components/Navbar"
import Envelope from "../components/Envelope"

function Home() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await api.get('/posts');
                setPosts(res.data)
            }
            catch (err) {
                console.error("Error fetching posts", err)
            }
        }

        fetchPosts()
    }, [])

    return (
        <div className="min-h-screen bg-[#f0ead6] px-4 py-6 sm:px-6">
            <Navbar />
            <h1 className="text-3xl font-serif mt-3 mb-6 text-[#4b3621] text-center">
                Your Calm Letter Feed ✉️
            </h1>
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate('/new')}
                    className="px-8 py-3 rounded-full shadow-md bg-gradient-to-br from-[#a33c1e] to-[#7e1a0a] 
                   text-[#f5f1e6] font-serif hover:scale-105 transform transition-transform duration-300 flex items-center justify-center gap-2">
                    🕯️ Write a letter ✍️
                </button>
            </div>

            <div className="flex flex-col space-y-6">
                {posts.length === 0 ? (
                    <p className="text-center text-[#4b3621] font-serif">No letters yet. Write one!</p>
                ) : (
                    posts.map(letter => <Envelope key={letter.id} letter={letter} />)
                )}
            </div>
        </div>
    )

}

export default Home