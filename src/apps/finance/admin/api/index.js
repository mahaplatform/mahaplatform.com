import reimbursements from './reimbursements'
import expense_types from './expense_types'
import revenue_types from './revenue_types'
import disbursements from './disbursements'
import memberships from './memberships'
import customers from './customers'
import merchants from './merchants'
import accounts from './accounts'
import payments from './payments'
import products from './products'
import projects from './projects'
import receipts from './receipts'
import advances from './advances'
import expenses from './expenses'
import invoices from './invoices'
import { Router } from 'express'
import reports from './reports'
import coupons from './coupons'
import batches from './batches'
import vendors from './vendors'
import refunds from './refunds'
import checks from './checks'
import rates from './rates'
import users from './users'
import trips from './trips'
import items from './items'
import item from './item'

const router = new Router({ mergeParams: true })

router.use('/accounts', accounts)

router.use('/advances', advances)

router.use('/batches', batches)

router.use('/checks', checks)

router.use('/coupons', coupons)

router.use('/customers', customers)

router.use('/disbursements', disbursements)

router.use('/expense_types', expense_types)

router.use('/expenses', expenses)

router.use(items)

router.use(item)

router.use('/invoices', invoices)

router.use('/memberships', memberships)

router.use('/merchants', merchants)

router.use('/payments', payments)

router.use('/projects', projects)

router.use('/products', products)

router.use('/rates', rates)

router.use('/receipts', receipts)

router.use('/refunds', refunds)

router.use('/reimbursements', reimbursements)

router.use('/revenue_types', revenue_types)

router.use('/reports', reports)

router.use('/trips', trips)

router.use('/users/:user_id', users)

router.use('/vendors', vendors)

export default router
