import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import websockets from './src/config/websocket/websocket.js'
import AppRouter from './src/app.router.js'
import AppMiddleware from './src/app.middleware.js'
import AppConfig from './src/app.config.js'
import errorHandler from './src/middlewares/handle-error.js'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: '*' } })
websockets(io)
app.use((req, res, next) => {
  req.io = io
  next()
})

app.use(AppConfig)
app.use(AppMiddleware)
app.use(AppRouter)



app.get('/', (req, res) => {
  res.send('SERVER is running')
})

app.use(errorHandler)

const PORT = process.env.PORT || 3030
httpServer.listen(PORT, () => {
  console.log(`SERVER is running on port [${PORT}]`)
})

export default app
