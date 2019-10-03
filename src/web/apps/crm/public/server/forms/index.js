import express from 'express'
import embed from './embed'
import show from './show'
import form from './form'
import path from 'path'

const server = express()

server.set('views', path.join(__dirname))

server.set('view engine', 'ejs')

server.get('/:code/embed.js', embed)

server.get('/:code/form.js', form)

server.get('/:code', show)

server.post('/:code', show)

export default server
