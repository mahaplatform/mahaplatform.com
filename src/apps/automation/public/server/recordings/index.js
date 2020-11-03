import express from 'express'
import show from './show'

const server = express()

server.get('/:code', show)

export default server
