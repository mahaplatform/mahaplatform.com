import { Router } from 'express'
import create from './create'
import update from './update'
import show from './show'
import push from './push'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.get('/:fingerprint', show)

router.patch('/:fingerprint', update)

router.post('/:fingerprint/push', push)

export default router
