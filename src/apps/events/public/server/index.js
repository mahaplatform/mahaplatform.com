import registration from './registration'
import { Router } from 'express'
import tickets from './tickets'

const router = new Router({ mergeParams: true })

router.use('/registration', registration)

router.use('/tickets', tickets)

export default router
