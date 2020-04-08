import { Router } from 'express'
import list from './list'
import jobs from './jobs'
import status from './status'
import clean from './clean'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.use('/:name/jobs', jobs)

router.get('/:name/:status', status)

router.patch('/:name/:status/clean', clean)

export default router
