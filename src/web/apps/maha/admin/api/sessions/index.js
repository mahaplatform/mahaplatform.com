import { Router } from 'express'
import signout from './signout'
import remove from './remove'

const router = new Router({ mergeParams: true })

router.post('/:id/signout', signout)

router.post('/:id/remove', remove)

export default router
