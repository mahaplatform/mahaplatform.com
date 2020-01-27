import express from 'express'
import embed from './embed'
import show from './show'
import preview from './preview'

const server = express()

server.get('/:code/preview', preview)

server.get('/:code/embed.js', embed)

server.get('/:code', show)

export default server
