import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSignup(e) {
        e.preventDefault();
        try {
            const res = await api.post('/users/signup', { username, password });
            res.coo
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('username', username);

            alert('Signup successful!')
            navigate('/')
            
        } catch (err) {
            alert('Signup Failed');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0ead6] px-4">
            <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-[#4b3621] bg-[#f5f1e6]">
                <h1 className="text-2xl sm:text-3xl font-serif mb-6 text-[#4b3621] text-center tracking-wider">
                    GetLetter ✉️
                </h1>

                <form onSubmit={handleSignup} className="flex flex-col space-y-4 sm:space-y-5">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 border border-[#4b3621] rounded-lg outline-none bg-[#f5f1e6] text-[#4b3621] placeholder-[#7d6a58] font-serif shadow-sm text-sm sm:text-base"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-[#4b3621] rounded-lg outline-none bg-[#f5f1e6] text-[#4b3621] placeholder-[#7d6a58] font-serif shadow-sm text-sm sm:text-base"
                    />
                    <button
                        onClick={() => navigate('/')}
                        type="submit"
                        className="w-full py-3 rounded-xl font-serif shadow-md bg-[#7e3a15] text-[#f5f1e6] hover:bg-[#6b0a0a] transition-colors text-sm sm:text-base"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="text-center text-[#4b3621] mt-4 font-serif text-sm sm:text-base">
                    Already have an account?
                    <a href="/login" className="ml-1 text-[#7e3a15] hover:text-[#6b0a0a] underline">Login</a>
                </p>
            </div>
        </div>
    );
}

export default Signup;
