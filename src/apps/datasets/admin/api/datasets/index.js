import { Router } from 'express'
import destroy from './destroy'
import backup from './backup'
import create from './create'
import update from './update'
import access from './access'
import types from './types'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/backup', backup)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:dataset_id/access', access)

router.use('/:dataset_id/types', types)

export default router
