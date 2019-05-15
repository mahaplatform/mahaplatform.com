import { Router } from 'express'
import access from './access'
import share from './share'
import trash from './trash'
import items from './items'

const router = new Router({ mergeParams: true })

router.use('/trash', trash)

router.use('/share', share)

router.use('/items', items)

router.use('/items/:code/access', access)

export default router
