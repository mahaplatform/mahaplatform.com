import './core/services/environment'
import sourceMapSupport from 'source-map-support'
import socketio from './core/lib/socketio'
import app from './core/lib/express'
import log from './core/utils/log'
import { Server } from 'http'

if(process.env.NODE_ENV === 'production') sourceMapSupport.install()

const transport = Server(app)

socketio(transport)

transport.listen(process.env.SERVER_PORT)

log('info', 'server', `Listening on ${process.env.SERVER_PORT}`)
