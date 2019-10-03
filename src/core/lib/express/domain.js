import _ from 'lodash'
import os from 'os'

const ifaces = os.networkInterfaces()

const ips = Object.keys(ifaces).reduce((ips, iface) => [
  ...ips,
  ...ifaces[iface].map(adapter => adapter.address)
], [])

const domain = (middleware) => async (req, res, next) => {
  if(_.isNil(req.headers.host)) return next()
  const match = req.headers.host.match(/^([\w.]*):?(\d*)?$/)
  const hostname = match !== null ? match[1] : process.env.DOMAIN
  if(!_.includes([ process.env.DOMAIN, 'localhost', 'dev.mahaplatform.com', ...ips ], hostname)) return next()
  middleware(req, res, next)
}

export default domain
