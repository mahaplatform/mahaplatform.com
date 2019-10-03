import publish_all from './publish_all'
import delete_all from './delete_all'
import finalize from './finalize'
import { Router } from 'express'
import publish from './publish'
import destroy from './destroy'
import create from './create'
import update from './update'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.patch('/delete', delete_all)

router.patch('/publish', publish_all)

router.patch('/finalize', finalize)

router.get('/:id', show)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.patch('/:id/publish', publish)

export default router
