import express from 'express'
import preferences from './preferences'
import path from 'path'

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/:code', preferences)

server.post('/:code', preferences)

export default server
