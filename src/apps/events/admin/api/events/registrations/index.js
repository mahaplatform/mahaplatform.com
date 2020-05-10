import enrollment from './enrollment'
import download from './download'
import { Router } from 'express'
import actions from './actions'
import tickets from './tickets'
import destroy from './destroy'
import create from './create'
import update from './update'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/download', download)

router.get('/:id', show)

router.get('/:id/actions', actions)

router.get('/:id/edit', edit)

router.get('/:id/enrollment', enrollment)

router.get('/:id/tickets', tickets)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
