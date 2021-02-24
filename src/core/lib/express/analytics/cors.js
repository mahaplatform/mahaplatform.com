import cors from 'cors'

const corsMiddleware = cors({
  origin: (origin,callback) => callback(null, true)
})

export default corsMiddleware
