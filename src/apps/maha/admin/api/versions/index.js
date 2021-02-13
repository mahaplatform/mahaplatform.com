import rollback from './rollback'
import { Router } from 'express'
import current from './current'
import publish from './publish'
import update from './update'
import create from './create'
import list from './list'

const router = new Router({ mergeParams: true })

router.patch('/', update)

router.post('/', create)

router.get('/current', current)

router.get('/', list)

router.patch('/publish', publish)

router.patch('/rollback', rollback)

export default router
