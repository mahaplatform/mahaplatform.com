import { Router } from 'express'
import path from 'path'
import cors from 'cors'

const router = new Router({ mergeParams: true })

router.use(cors({
  origin:(origin, callback) => callback(null, true),
  credentials: true
}))

router.get('/mt.js', (req, res) => {
  res.set('Cache-Control', 'immutable,max-age=100000000,public')
  res.status(200).sendFile(path.resolve(__dirname,'mt.js'))
})

export default router
