export default function ReplyList({ replies }) {
    return (
        <div className="ml-4 mb-2">
            {replies.map(r => (
                <p key={r.id} className="text-[#4b3621] text-sm mb-1">
                    <span className="font-bold">{r.username}:</span> {r.content}
                </p>
            ))}
        </div>
    )
}