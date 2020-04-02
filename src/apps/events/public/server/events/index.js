import tickets from './tickets'
import express from 'express'

const server = express()

server.use('/:event_code/tickets', tickets)

export default server
