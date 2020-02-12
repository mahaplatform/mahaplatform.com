import { Router } from 'express'
import update from './update'

const router = new Router({ mergeParams: true })

router.patch('/:type/:program_code/:code', update)

export default router
