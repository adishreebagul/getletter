import express from 'express'
import db from '../db.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

router.get('/', authenticate, async(req, res) => {
    const author_id = req.user.userId
    try {
        const [posts] = await db.execute(`SELECT p.*, u.username FROM posts p JOIN users u ON p.author_id = u.id WHERE p.author_id = ? ORDER BY reveal_at DESC`, [author_id]
        )
        res.json(posts)
    }
    catch (err) {
        console.error(err) 
        res.status(500).json({ error: 'Server error'})
    }

})

export default router