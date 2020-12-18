import download from './download'
import express from 'express'
import code from './code'
import show from './show'

const server = express()

server.get('/:code', show)

server.get('/:code/code', code)

server.get('/:code/download', download)

export default server
