import { useNavigate } from "react-router-dom";
import Search from "./Search";

export default function Navbar() {
    const navigate = useNavigate()
    const username = localStorage.getItem("username")

    function handleLogout() {
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        navigate('/login')
    }

    return (
        <nav className="bg-[#f5f1e6] border-b border-[#4b3621] px-4 py-3 font-serif">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <h1
                    className="text-[#4b3621] text-xl font-bold tracking-wider cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    GetLetter ✉️
                </h1>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <span className="text-[#4b3621]">{username}</span>
                    <button
                        onClick={() => navigate('/my-posts')}
                        className="px-3 py-1 rounded-lg bg-[#7e3a15] text-[#f5f1e6] hover:bg-[#6b0a0a] text-sm"
                    >
                        My Letters
                    </button>
                    <button
                        onClick={() => navigate('/friends')}
                        className="px-3 py-1 rounded-lg bg-[#7e3a15] text-[#f5f1e6] hover:bg-[#6b0a0a] text-sm"
                    >
                        My Friends
                    </button>
                    <button
                        onClick={() => navigate('/users/profile')}
                        className="px-3 py-1 rounded-lg bg-[#7e3a15] text-[#f5f1e6] hover:bg-[#6b0a0a] text-sm"
                    >
                        My Profile
                    </button>
                     <button
                        onClick={() => navigate('/messages/private')}
                        className="px-3 py-1 rounded-lg bg-[#7e3a15] text-[#f5f1e6] hover:bg-[#6b0a0a] text-sm"
                    >
                        Letters from friends
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-3 py-1 rounded-lg bg-[#7e3a15] text-[#f5f1e6] hover:bg-[#6b0a0a] text-sm"
                    >
                        Logout
                    </button>
                </div>
                <div className="w-full sm:w-64">
                        <Search />
                    </div>
            </div>
        </nav>
    )
}
