import express from 'express'
import share from './share'
import path from 'path'

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/:code', share)

export default server
