import collectObjects from '../../utils/collect_objects'
import express from 'express'

const faxFiles = collectObjects('hooks/fax/index.js')

const server = new express()

faxFiles.map(faxFile => {
  server.use('/fax', faxFile.default)
})

export default server
