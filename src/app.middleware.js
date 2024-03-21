import express from 'express'
import cors from 'cors'
import camelizedKeys from './middlewares/humps.js'
import onRequest from './middlewares/on-request.js'
import setUserRequest from './middlewares/set-user-request.js'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '1000000000kb' }))
app.use(cors())
app.use(camelizedKeys())
app.use(onRequest())
app.use(setUserRequest())

export default app
