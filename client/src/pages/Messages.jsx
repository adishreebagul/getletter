import NewLetter from "./NewLetter";

export default function SendMessage() {
  return (
    <div className="min-h-screen bg-[#f0ead6] px-4 py-6">
      <h1 className="text-3xl font-serif mb-6 text-center text-[#4b3621]">
        Send Private Letter ✉️
      </h1>
      <NewLetter isPrivate />
    </div>
  );
}
