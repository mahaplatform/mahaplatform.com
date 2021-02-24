import { Router } from 'express'
import items from './items'

const router = new Router({ mergeParams: true })

router.use('/:dataset_code/types/:type_code/items', items)

export default router
