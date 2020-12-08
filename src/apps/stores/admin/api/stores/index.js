import performance from './performance'
import categories from './categories'
import workflows from './workflows'
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

router.get('/:id/workflows', workflows)

router.patch('/:id/inventory', inventory)

router.get('/:id/performance', performance)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:store_id/categories', categories)

router.use('/:store_id/products', products)

export default router
