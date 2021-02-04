import rollback from './rollback'
import current from './current'
import { Router } from 'express'
import update from './update'
import list from './list'

const router = new Router({ mergeParams: true })

router.patch('/', update)

router.get('/current', current)

router.get('/', list)

router.patch('/rollback', rollback)

export default router
