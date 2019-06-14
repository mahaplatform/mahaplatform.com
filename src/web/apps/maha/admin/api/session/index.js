import { Router } from 'express'
import destroy from './destroy'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', show)

router.delete('/', destroy)

export default router
