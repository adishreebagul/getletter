import express from 'express'
import db from '../db.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

router.post('/request', authenticate, async (req, res) => {
    const { reciever_id } = req.body
    const requester_id = req.user.userId

    if (!reciever_id)
        return res.status(400).json({ error: 'Reciever required' })

    try {

        const [existing] = await db.execute(
            `SELECT * FROM friends 
             WHERE (requester_id = ? AND reciever_id = ?) 
                OR (requester_id = ? AND reciever_id = ?)`,
            [requester_id, reciever_id, reciever_id, requester_id]
        )

        if (existing.length > 0) {
            if (existing[0].status === 'pending') {
                return res.status(409).json({ error: 'Friend request already pending' })
            }
            if (existing[0].status === 'accepted') {
                return res.status(409).json({ error: 'You are already friends' })
            }
        }
        await db.execute(
            'INSERT INTO friends (requester_id, reciever_id, status) VALUES (?, ?, ?)',
            [requester_id, reciever_id, 'pending']
        )

        res.status(201).json({ message: 'Friend request sent' })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
})


router.post('/accept', authenticate, async (req, res) => {
    const { request_id } = req.body
    try {
        await db.execute(
            'UPDATE friends SET status = "accepted" WHERE id = ?', [request_id]
        )
        res.json({ message: 'Friend request accepted' })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error' })
    }
})

router.get('/requests', authenticate, async (req, res) => {
    const userId = req.user.userId
    const [requests] = await db.execute('SELECT f.id, u.username, f.requester_id FROM friends f JOIN users u ON f.requester_id = u.id WHERE f.reciever_id = ? AND f.status = "pending"', [userId])
    res.json(requests)
})

router.delete('/delete/:friendId', authenticate, async (req, res) => {
    const friendId = req.params.friendId
    const userId = req.user.userId

    try {
       await db.execute('DELETE FROM friends WHERE(requester_id = ? AND reciever_id = ?) OR(requester_id = ? AND reciever_id = ?)', [userId, friendId, friendId, userId])
       res.json({ message: "Friend removed successfully" })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
}
)

router.get('/', authenticate, async (req, res) => {
    const userId = req.user.userId
    const [friends] = await db.execute(
        `SELECT u.id, u.username FROM users u JOIN friends f ON (u.id = f.requester_id OR u.id = f.reciever_id) WHERE f.status = 'accepted' AND (f.requester_id = ? OR f.reciever_id = ?) AND u.id != ?`, [userId, userId, userId]
    )
    res.json(friends)
})


export default router