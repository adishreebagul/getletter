import express from 'express'
import bcrypt from 'bcrypt'
import db from '../db.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/signup', async(req, res) => {
    const { username, password } = req.body
    if (!username || !password)
        return res.status(400).json({ error: 'Missing fields'})

    try {
        const hash = await bcrypt.hash(password, 10)
        const [result] = await db.execute(
            'INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]
        )

        const token = jwt.sign({ userId: result.insertId, username}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d' })
        res.status(201).json({ userId: result.insertId, username, token })
    }
    catch (err) {
        if (err.code === 'ER_DUP_ENTRY')
            res.status(409).json({ error: 'Username already exists'})
        else {
            console.error(err)
            res.status(500).json({ error: 'Server error' })
        }
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    if(!username || !password)
        return res.status(400).json({ error: 'Missing fields'})

    try {
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE username = ?',[username]
        )
        if (rows.length === 0)
            return res.status(404).json({ error: 'User not found' })

        const user = rows[0]
        const match = await bcrypt.compare(password, user.password)
        if(!match)
            return res.status(401).json({ error: 'Incorrect password' })
        const token = jwt.sign(
            {userId: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '1d'}
        )
        res.json({ userId: user.id, username: user.username, token })
    }
    catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Server error'})
    }
})

export default router