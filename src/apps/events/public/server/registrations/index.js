import express from 'express'
import button from './button'
import show from './show'

const server = express()

server.get('/button.js', button)

server.get('/:code', show)

export default server
