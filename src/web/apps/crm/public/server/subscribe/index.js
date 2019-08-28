import express from 'express'
import subscribe from './subscribe'
import path from 'path'

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/:code', subscribe)

server.post('/:code', subscribe)

export default server
