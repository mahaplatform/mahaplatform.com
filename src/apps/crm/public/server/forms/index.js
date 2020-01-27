import express from 'express'
import embed from './embed'
import show from './show'

const server = express()

server.get('/:code/embed.js', embed)

server.get('/:code', show)

export default server
