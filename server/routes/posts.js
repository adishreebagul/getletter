import express from 'express'
import db from '../db.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

router.post('/', authenticate, async (req, res) => {
    const { content, mood_tag, reveal_at } = req.body

    if(!content || !mood_tag)
        return res.status(400).json({ error: 'Missing fields' })

    const author_id = req.user.userId
    const sealed_at = new Date()
    const revealAtDate = new Date(reveal_at)

    if (isNaN(revealAtDate.getTime())) {
        return res.status(400).json({ error: 'Invalid reveal date' });
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO posts (author_id, content, mood_tag, reveal_at) VALUES (?, ?, ?, ?)', [author_id, content, mood_tag, revealAtDate]
        )
        res.status(201).json({ postId: result.insertId })
    }
    catch(err){
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
})

router.get('/', authenticate, async (req, res) => {
    try {
        const [posts] = await db.execute(
            `SELECT p.*, u.username FROM posts p JOIN users u ON p.author_id = u.id WHERE reveal_at <= NOW() ORDER BY reveal_at ASC LIMIT 5`
        )
        res.json(posts)
    }
    catch(err) {
        console.error(err)
        res.status(500).json({ error: 'Server error'})
    }
})

export default router