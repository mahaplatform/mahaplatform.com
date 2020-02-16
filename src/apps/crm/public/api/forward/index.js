import { Router } from 'express'
import submit from './submit'

const router = new Router({ mergeParams: true })

router.post(':email_code/:email_address_code', submit)

export default router
