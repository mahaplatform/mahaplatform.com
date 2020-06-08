import { Router } from 'express'
import destroy from './destroy'
import create from './create'

const router = new Router({ mergeParams: true })

router.post('/', create)

router.delete('/', destroy)

export default router
