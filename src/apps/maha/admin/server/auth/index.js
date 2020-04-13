import cornell from './cornell'
import google from './google'
import express from 'express'
import ldap from './ldap'
import team from './team'
import path from 'path'

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/cornell', team, cornell)

server.post('/cornell', team, cornell)

server.get('/google', team, google)

server.get('/ldap', team, ldap)

export default server
