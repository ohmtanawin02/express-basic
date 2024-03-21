import express from 'express'
import { decodedToken } from './tokenizer.js'

const app = express()

export default () => (req, res, next) => {
  try {
    const decoded = decodedToken(req)
    if (decoded) {
      req._requestUser = { id: decoded.id, email: decoded.email }
    } else {
      req._requestUser = { id: 0, email: 'system' }
    }
  } catch (error) {
    console.error('Error decoding token:', error)
    req._requestUser = { id: 0, email: 'system' }
  }
  next()
}

export const GLOBAL = app
