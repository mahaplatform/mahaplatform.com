import { Router } from 'express'
import show from './show'
import push from './push'

const router = new Router({ mergeParams: true })

router.get('/:fingerprint', show)

router.post('/:fingerprint/push', push)

export default router
