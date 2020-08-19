import inventory from './inventory'
import products from './products'
import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:store_id/products', products)

router.patch('/:store_id/inventory', inventory)

export default router
