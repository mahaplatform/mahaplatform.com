import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import list from './list'
import smses from './smses'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/programs/:program_id/:type/:id', show)

router.use('/programs/:program_id/sms/:id/smses', smses)

router.post('/', create)

router.delete('/', destroy)

export default router
