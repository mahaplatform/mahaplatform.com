import collectObjects from '../../utils/collect_objects'
import express from 'express'

const smsFiles = collectObjects('hooks/sms/index.js')

const server = new express()

smsFiles.map(smsFile => {
  server.use('/sms', smsFile.default)
})

export default server
