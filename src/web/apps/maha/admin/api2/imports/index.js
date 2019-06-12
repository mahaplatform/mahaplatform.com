import omiterrors from './omiterrors'
import template from './template'
import _process from './process'
import { Router } from 'express'
import preview from './preview'
import destroy from './destroy'
import create from './create'
import update from './update'
import tables from './tables'
import fields from './fields'
import parse from './parse'
import items from './items'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/fields/:tablename', fields)

router.get('/tables/:tablename', tables)

router.get('/template', template)

router.get('/:id', show)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.post('/:id/preview', preview)

router.post('/:id/parse', parse)

router.post('/:id/process', _process)

router.post('/:id/omiterrors', omiterrors)

router.use('/:import_id/items', items)

export default router
