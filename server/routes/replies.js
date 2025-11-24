import express from 'express'
import db from '../db.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

router.post('/', authenticate, async (req, res) => {
    const { post_id, content } = req.body

    if(!post_id || !content)
        return res.status(400).json({ error: 'Missing fields' })
    
    const author_id = req.user.userId
    const sealed_at = new Date()
    const reveal_at = new Date()

    try {
        const [result] = await db.execute(
            'INSERT INTO replies(post_id, author_id, content, sealed_at, reveal_at) VALUES (?, ?, ?, ?, ?)',
            [post_id, author_id, content, sealed_at, reveal_at]
        )
        res.status(201).json({ replyId: result.insertId })
    }
    catch(err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
})

router.get('/:post_id', authenticate, async (req, res) => {
    const { post_id } = req.params

    try {
        const [rows] = await db.execute(`SELECT r.*, u.username FROM replies r JOIN users u ON r.author_id = u.id WHERE r.post_id = ? AND r.reveal_at <= NOW() ORDER BY r.reveal_at ASC`,
            [post_id]
        )

        res.json(rows)
    }
    catch(err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
})

export default router
