import { useState } from "react";
import PostCard from "./PostCard";

export default function Envelope({ letter, isPrivate = false }) {
    const [opened, setOpened] = useState(false);

    return (
        <div className="relative w-full max-w-xl mx-auto mb-6">
            {!opened ? (
                <div
                    onClick={() => setOpened(true)}
                    className="cursor-pointer p-6 bg-[#d9c5a2] border border-[#4b3621] rounded-xl shadow-lg flex items-center justify-center animate-fade-in hover:scale-105 transform transition-transform duration-300"
                >
                    <p className="text-[#4b3621] font-serif text-lg">📬 Tap to Open Letter</p>
                </div>
            ) : (
                <PostCard
                    post={letter} onClose={() => setOpened(false)} isPrivate={isPrivate}
                     />

            )}
        </div>
    );
}
