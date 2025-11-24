import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import signupRoutes from './routes/signup.js'
import postRoutes from './routes/posts.js'
import replyRoutes from './routes/replies.js'
import myPostsRoutes from './routes/myposts.js'
import friendsRoutes from './routes/friends.js'
import userRoutes from './routes/users.js'
import profileRoutes from './routes/profile.js'
import messageRoutes from './routes/messages.js'
import cookieParser from 'cookie-parser'
import db from './db.js'

dotenv.config()

const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use(express.json())
app.use(cookieParser())


app.use('/posts', postRoutes)
app.use('/users', signupRoutes)
app.use('/replies', replyRoutes)
app.use('/my-posts', myPostsRoutes)
app.use('/friends', friendsRoutes)
app.use('/users', userRoutes)
app.use('/users/profile', profileRoutes)
app.use('/messages', messageRoutes)

app.get('/', (req, res) => {
    res.send('Server is running')
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))