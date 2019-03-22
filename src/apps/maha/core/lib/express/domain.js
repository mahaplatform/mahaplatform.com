import collectObjects from '../../utils/collect_objects'
import _ from 'lodash'
import os from 'os'

const files = collectObjects('public/domains.js')

const ifaces = os.networkInterfaces()

const ips = Object.keys(ifaces).reduce((ips, iface) => [
  ...ips,
  ...ifaces[iface].map(adapter => adapter.address)
], [])

export const adminDomainMiddleware = (middleware) => async (req, res, next) => {

  if(_.isNil(req.headers.host)) return next()

  const match = req.headers.host.match(/^([\w.]*):?(\d*)?$/)

  const hostname = match !== null ? match[1] : process.env.DOMAIN

  if(!_.includes([ process.env.DOMAIN, 'localhost', 'dev.mahaplatform.com', ...ips ], hostname)) return next()

  middleware(req, res, next)

}

export const publicDomainMiddleware = (middleware) => async (req, res, next) => {

  const domains = await Promise.reduce(files, async (domains, domain) => {

    const appDomains = await domain.default()

    return [
      ...domains,
      ...appDomains
    ]

  }, [])

  const [,hostname] = req.headers.host.match(/^([\w.]*):?(\d*)?$/)

  if(!_.includes(domains, hostname)) return next()

  middleware(req, res, next)

}
