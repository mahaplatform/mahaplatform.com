const hostMiddleware = async (req, res, next) => {
  if(process.env.NODE_ENV !== 'production') return next()
  const protocol = req.headers['x-forwarded-proto']
  const host = req.headers.host
  if(`${protocol}://${host}` === process.env.ADMIN_HOST) return next()
  return res.status(301).redirect(`${process.env.ADMIN_HOST}${req.originalUrl}`)
}

export default hostMiddleware
