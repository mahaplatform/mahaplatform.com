import attractions from './attractions'
import categories from './categories'
import offerings from './offerings'
import counties from './counties'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/attractions', attractions)

router.use('/categories', categories)

router.use('/offerings', offerings)

router.use('/counties', counties)

export default router
