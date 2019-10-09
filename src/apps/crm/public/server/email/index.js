import express from 'express'
import open from './open'
import link from './link'

const server = express()

server.get('/o:email_code([a-z0-9]{4})', open)

server.get('/l:email_code([a-z0-9]{4}):link_code([a-z0-9]{4})', link)

export default server
