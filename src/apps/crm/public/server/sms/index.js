import create from './create'
import express from 'express'

const server = express()

server.post('/', create)

export default server
