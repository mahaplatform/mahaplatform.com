import expense_types from './expense_types'
import memberships from './memberships'
import accounts from './accounts'
import projects from './projects'
import statuses from './statuses'
import receipts from './receipts'
import { Router } from 'express'
import batches from './batches'
import vendors from './vendors'
import rates from './rates'
import users from './users'

const router = new Router({ mergeParams: true })

router.use('/accounts', accounts)

router.use('/batches', batches)

router.use('/expense_types', expense_types)

router.use('/memberships', memberships)

router.use('/projects', projects)

router.use('/rates', rates)

router.use('/receipts', receipts)

router.use('/statuses', statuses)

router.use('/users/:user_id', users)

router.use('/vendors', vendors)

export default router
