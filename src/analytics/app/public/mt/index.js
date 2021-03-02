import { Router } from 'express'
import collect from './collect'

const router = new Router({ mergeParams: true })

router.post('/collect', collect)

export default router
