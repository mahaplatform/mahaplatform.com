import authorize from './authorize'
import preview from './preview'
import express from 'express'
import token from './token'
import path from 'path'

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/:source/authorize', authorize)

server.get('/:source/token', token)

server.get('/:source/preview', preview)

export default server
