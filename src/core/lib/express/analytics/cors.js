import cors from 'cors'

const corsMiddleware = async (req, res, next) => {

  var origin = async (origin, callback) => callback(null, true)

  return cors({
    origin:(origin, callback) => callback(null, true)
  })(req, res, next)

}

export default corsMiddleware
