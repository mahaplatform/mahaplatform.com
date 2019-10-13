import { Router } from 'express'
import receive from './receive'
import update from './update'
import status from './status'

const router = new Router({ mergeParams: true })

router.post('/', receive)

router.post('/status', status)

router.post('/update', update)

export default router
