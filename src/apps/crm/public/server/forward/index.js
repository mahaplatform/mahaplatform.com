import express from 'express'
import show from './show'

const server = express()

server.get('/:email_code/:email_address_code', show)

export default server
