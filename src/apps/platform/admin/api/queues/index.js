import { Router } from 'express'
import list from './list'
import jobs from './jobs'
import job from './job'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/:name/:status', jobs)

router.get('/:name/jobs/:id', job)

export default router
