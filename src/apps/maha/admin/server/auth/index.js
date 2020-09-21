import { cornell, metadata } from './cornell'
import google from './google'
import express from 'express'
import ldap from './ldap'
import path from 'path'

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/cornell/metadata', metadata)

server.use('/cornell', cornell)

server.get('/google', google)

server.get('/ldap', ldap)

export default server
