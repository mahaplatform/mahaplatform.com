import express from 'express'
import show from './show'
import path from 'path'

const server = express()

server.get('/:code', show)

export default server
