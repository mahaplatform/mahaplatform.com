import path from 'path'

const faviconMiddleware = async (req, res, next) => {

  res.sendFile(path.resolve(__dirname, 'maha.png'))

}

export default faviconMiddleware
