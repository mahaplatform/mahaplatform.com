import cors from 'cors'

const corsMiddleware = cors({
  credentials: true,
  origin: (origin,callback) => callback(null, true)
})

export default corsMiddleware
