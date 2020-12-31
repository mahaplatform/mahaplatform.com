import { Router } from 'express'
import path from 'path'
import cors from 'cors'

const router = new Router({ mergeParams: true })

router.use(cors({
  origin:(origin, callback) => callback(null, true)
}))

router.use('/collect', (req, res) => res.status(200).send(true))

router.get('/mt.js', (req, res) => res.status(200).sendFile(path.resolve(__dirname,'mt.js')))

export default router
