import path from 'path'

const format = (req, res, next) => {
  const extension = path.extname(req.path)
  req.url = req.url.replace(extension, '')
  req.format = extension ? extension.slice(1) : 'json'
  next()
}

export default format
