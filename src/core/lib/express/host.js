const hostMiddleware = async (req, res, next) => {
  const protocol = req.headers['x-forwarded-proto']
  const host = req.headers.host
  if(`${protocol}://${host}` === process.env.WEB_HOST) return next()
  return res.status(301).redirect(`${process.env.WEB_HOST}${req.originalUrl}`)
}

export default hostMiddleware
