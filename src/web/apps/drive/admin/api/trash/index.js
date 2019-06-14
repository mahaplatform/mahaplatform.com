import restore_all from './restore_all'
import { Router } from 'express'
import empty from './empty'
import list from './list'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/empty', empty)

router.post('/restore_all', restore_all)

export default router
