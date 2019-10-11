import collectObjects from '../../utils/collect_objects'
import express from 'express'

const voiceFiles = collectObjects('hooks/voice/index.js')

const server = new express()

voiceFiles.map(voiceFile => {
  server.use('/voice', voiceFile.default)
})

export default server
