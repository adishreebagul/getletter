import express from 'express'
import db from '../db.js'
import authenticate from '../middleware/auth.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.put('/', authenticate, async (req, res) => {
    const userId = req.user.userId
    const { username, newPassword, oldPassword } = req.body

    if (!username && !newPassword)
        return res.status(400).json({ error: "Nothing to update" })

    try {
        const [userRows] = await db.execute("SELECT password FROM users WHERE id = ?", [userId])
        if (!userRows.length)
            return res.status(404).json({ error: "User not found" })

        const user = userRows[0]

        if (newPassword) {
            if (!oldPassword) {
                return res.status(400).json({ error: "Please enter your current password" })
            }
            const match = await bcrypt.compare(oldPassword, user.password)
            if (!match)
                return res.status(400).json({ error: "Current password is incorrect" })
        }

        const updates = []
        const values = []

        if (username) {
            updates.push("username = ?")
            values.push(username)
        }

        if (newPassword) {
            const hashed = await bcrypt.hash(newPassword, 10)
            updates.push("password = ?")
            values.push(hashed)
        }

        values.push(userId)

        const sql = `UPDATE users set ${updates.join(", ")} WHERE id = ?`
        await db.execute(sql, values)

        res.json({ message: "Profile updated successfully", username })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: "Server error" })
    }
})

export default router 