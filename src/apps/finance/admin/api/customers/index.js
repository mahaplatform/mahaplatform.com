import payment_methods from './payment_methods'
import scholarships from './scholarships'
import { Router } from 'express'
import invoices from './invoices'
import payments from './payments'
import refunds from './refunds'
import credits from './credits'
import destroy from './destroy'
import create from './create'
import update from './update'
import sales from './sales'
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

router.use('/:customer_id/credits', credits)

router.use('/:customer_id/invoices', invoices)

router.use('/:customer_id/payment_methods', payment_methods)

router.use('/:customer_id/payments', payments)

router.use('/:customer_id/refunds', refunds)

router.use('/:customer_id/sales', sales)

router.use('/:customer_id/scholarships', scholarships)

export default router
