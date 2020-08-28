import collectObjects from '../../../utils/collect_objects'
import cors from 'cors'
import _ from 'lodash'
import os from 'os'

const ifaces = os.networkInterfaces()

const ips = Object.keys(ifaces).reduce((ips, iface) => [
  ...ips,
  ...ifaces[iface].map(adapter => adapter.address)
], []).filter(ip => {
  return ip.match(/:/) === null
}).map(ip => {
  return process.env.SERVER_PORT ?`http://${ip}:${process.env.SERVER_PORT}` : `http://${ip}`
})

const originFiles = collectObjects('origins.js')

const corsMiddleware = async (req, res, next) => {

  if(process.env.NODE_ENV !== 'production') return cors({
    origin: (origin,callback) => callback(null, true)
  })(req, res, next)

  var origin = async (origin, callback) => {

    if(!origin) return callback(null, true)

    const whitelist = await Promise.reduce(originFiles, async(whitelist, originFile) => _.uniq([
      ...whitelist,
      ...await originFile.default(req)
    ]), [...ips, process.env.WEB_HOST])

    if(_.includes(whitelist, origin)) return callback(null, true)

    callback(new Error('Invalid origin'))

  }

  return cors({ origin })(req, res, next)

}

export default corsMiddleware
