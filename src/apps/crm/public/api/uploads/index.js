import { Router } from 'express'
import upload from './upload'
import check from './check'

const router = new Router({ mergeParams: true })

router.get('/', check)

router.post('/', upload)

export default router
