import { useState } from "react";
import api from "../api/axios";

export default function ReplyForm({ postId, onRepliesUpdate }) {
    const [replyText, setReplyText] = useState('')

    async function handleReply(e) {
        e.preventDefault()
        if (!replyText.trim()) return

        try {
            await api.post('/replies', { post_id: postId, content: replyText })
            setReplyText("")
            const res = await api.get(`/replies/${postId}`)
            onRepliesUpdate(res.data)
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <form onSubmit={handleReply} className="flex space-x-2">
            <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="flex-1 px-3 py-2 border-[#4b3621] rounded-lg bg-[#f5f1e6] text-[#4b3621] outline-none text-sm" />
            <button type="submit" className="px-4 py-2 bg-[#7e3a15] text-[#f5f1e6] rounded-lg hover:bg-[#6b0a0a]">
                Reply
            </button>
        </form>
    )
}