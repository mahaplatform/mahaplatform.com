import { Router } from 'express'
import create from './create'
import update from './update'
import status from './status'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.post('/status', status)

router.post('/update', update)

export default router
