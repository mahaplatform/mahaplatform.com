import { Router } from 'express'
import _process from './process'
import preview from './preview'
import destroy from './destroy'
import create from './create'
import update from './update'
import fields from './fields'
import items from './items'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.post('/preview', preview)

router.get('/fields', fields)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id/process', _process)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:import_id/items', items)

export default router
