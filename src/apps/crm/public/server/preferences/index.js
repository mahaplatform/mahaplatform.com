import express from 'express'
import show from './show'

const server = express()

server.get('/:type/:email_code/:code', show)

export default server
