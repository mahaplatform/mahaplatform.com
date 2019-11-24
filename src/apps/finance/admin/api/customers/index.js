import scholarships from './scholarships'
import { Router } from 'express'
import invoices from './invoices'
import payments from './payments'
import credits from './credits'
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

router.use('/:customer_id/credits', credits)

router.use('/:customer_id/invoices', invoices)

router.use('/:customer_id/payments', payments)

router.use('/:customer_id/scholarships', scholarships)

export default router
