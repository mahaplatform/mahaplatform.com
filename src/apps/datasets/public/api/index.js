import { Router } from 'express'
import records from './records'

const router = new Router({ mergeParams: true })

router.use('/:dataset_code/types/:type_code/records', records)

export default router
