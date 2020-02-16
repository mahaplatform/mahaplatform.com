import express from 'express'
import show from './show'

const server = express()

server.get('/:type/:email_code([a-z0-9]{10}):code([a-z0-9]{10})', show)

export default server
