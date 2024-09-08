import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import { connectDB } from './db/db.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import notificationRoutes from './routes/posts.js'
import { register } from './controllers/auth.js'
import { createPost } from './controllers/posts.js'
import { verifyToken } from './middleware/auth.js'
import http from 'http'
import { initNotificationService } from './services/notificationService.js'
import { Server as SocketIoServer } from 'socket.io'

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage })

/* ROUTES WITH FILES */
app.post('/auth/register', upload.single('picture'), register)
app.post('/posts', verifyToken, upload.single('picture'), createPost)

/* ROUTES */
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/posts', postRoutes)
app.use('/notifications', notificationRoutes)

/* Create HTTP server and integrate with Express */
const server = http.createServer(app)

/* Initialize Socket.io */
const io = new SocketIoServer(server)

initNotificationService(io)

/* Handle Socket.io connections */
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id)

  /* Join room for the specific user (use user ID as room name) */
  socket.on('joinRoom', (userId) => {
    socket.join(userId.toString())
  })

  /* Handle disconnection */
  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

/* MONGOOSE SETUP */

dotenv.config()

app.get('/', (req, res) => {
  res.send('hello world')
})

server.listen(3001, () => {
  connectDB()
  console.log('server is running on port 3001')
})
