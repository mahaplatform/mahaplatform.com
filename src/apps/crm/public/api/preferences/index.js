import { Router } from 'express'
import update from './update'

const router = new Router({ mergeParams: true })

router.patch('/:type/:email_code/:email_address_code', update)

export default router
