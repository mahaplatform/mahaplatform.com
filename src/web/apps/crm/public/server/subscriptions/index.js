import express from 'express'
import path from 'path'
import preferences from './preferences'

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/preferences/:code', preferences)

server.post('/preferences/:code', preferences)

export default server
