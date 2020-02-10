import express from 'express'
import show from './show'

const server = express()

server.get('/:type/:program_code/:code', show)

export default server
