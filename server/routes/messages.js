import express from 'express'
import db from '../db.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

router.post('/', authenticate, async (req, res) => {

    const { reciever_id, content, mood_tag, reveal_at } = req.body
    const author_id = req.user.userId
    const sealed_at = new Date()
    const is_read = 0

    if (!reciever_id)
        return res.status(400).json({ error: "Receiver required" })

    if (!content || !mood_tag)
        return res.status(400).json({ error: "Missing fields" })

    const revealAtDate = new Date(reveal_at)

    if (isNaN(revealAtDate.getTime()))
        return res.status(400).json({ error: "Invalid reveal date" });


    try {
        const [friendsRows] = await db.execute(`SELECT * FROM friends WHERE ((requester_id = ? AND reciever_id = ?) OR (requester_id = ? AND reciever_id = ?)) AND status = 'accepted'`, [author_id, reciever_id, reciever_id, author_id])
        if (friendsRows.length === 0)
            return res.status(403).json({ error: "You can only send letters to friends" })

        const [message] = await db.execute('INSERT INTO messages (author_id, reciever_id, content, mood_tag, reveal_at, sealed_at, is_read) VALUES (?, ?, ?, ?, ?, ?, ?)', [author_id, reciever_id, content, mood_tag, reveal_at, sealed_at, is_read])
        res.status(201).json({
            letterId: message.insertId,
            author_id,
            reciever_id,
            content,
            mood_tag,
            reveal_at: revealAtDate,
            sealed_at,
            is_read
        })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

router.get('/private', authenticate, async (req, res) => {
    const userId = req.user.userId;

    try {
        const [messages] = await db.execute(
            `SELECT m.*, u.username AS username 
             FROM messages m
             JOIN users u ON m.author_id = u.id
             WHERE m.reciever_id = ? AND m.reveal_at <= NOW()
             ORDER BY m.reveal_at DESC`,
            [userId]
        );
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});


export default router