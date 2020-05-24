import unauthorized from './unauthorized'
import authorized from './authorized'
import notFound from './not_found'
import { Router } from 'express'
import format from './format'
import pub from './public'
import cors from './cors'

const router = new Router({ mergeParams: true })

router.use(format)

router.use('/admin', unauthorized)

router.use('/admin', authorized)

router.use(cors)

router.use(pub)

router.use(notFound)

export default router
