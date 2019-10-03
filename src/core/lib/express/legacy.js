import url from 'url'

const legacyRoute = (req, res, next) => {

  const uri = url.parse(req.originalUrl)

  if(uri.pathname.startsWith('/admin')) return next()

  res.redirect(301, `${process.env.WEB_HOST}/admin${uri.pathname}`.replace(/\/$/, ''))

}

export default legacyRoute
