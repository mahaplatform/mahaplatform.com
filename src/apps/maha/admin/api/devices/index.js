import { Router } from 'express'
import list from './list'
import show from './show'
import push from './push'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:fingerprint', show)

router.post('/:fingerprint/push', push)

export default router
