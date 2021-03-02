import '@core/services/environment'
import log from '@core/utils/log'
import { Server } from 'http'
import express from 'express'

const app = express()

app.get('/ping', (req, res) => { res.status(200).send('pong') })

app.post('/mt/collect', (req, res) => { res.status(200).send(true) })

const transport = Server(app)

transport.listen(process.env.SERVER_PORT, () => {
  log('info', 'collector', `Listening on ${process.env.SERVER_PORT}`)
})
