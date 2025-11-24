import express from 'express'
import db from '../db.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

router.get('/search', authenticate, async(req, res) => {
    const { username } = req.query
    try {
        const [users] = await db.execute(
            `SELECT id, username FROM users WHERE username LIKE ? LIMIT 10`, [`%${username}%`]
        )
        res.json(users)
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error"})     
    }
})

export default router