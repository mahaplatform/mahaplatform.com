import url from 'url'
import path from 'path'

const legacyMiddleware = (req, res, next) => {

  const uri = url.parse(req.originalUrl)

  if(uri.pathname.startsWith('/admin')) return next()

  res.redirect(301, `/admin${uri.pathname}`.replace(/\/$/, ''))

}

export default legacyMiddleware
