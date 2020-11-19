import unschedule from './unschedule'
import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import edit from './edit'
import list from './list'
import show from './show'
import send from './send'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id/send', send)

router.patch('/:id/unschedule', unschedule)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
