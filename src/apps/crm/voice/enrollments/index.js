import { Router } from 'express'
import show from './show'

const router = new Router({ mergeParams: true })

router.post('/:enrollment_code', show)

router.post('/:enrollment_code/:code', show)

router.post('/:enrollment_code/:code/:verb', show)


export default router
