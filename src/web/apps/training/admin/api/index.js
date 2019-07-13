import fulfillments from './fulfillments'
import assignments from './assignments'
import trainings from './trainings'
import { Router } from 'express'
import quizes from './quizes'

const router = new Router({ mergeParams: true })

router.use('/assignments', assignments)

router.use('/:quizable_type/:quizable_id/quizes', quizes)

router.use('/quizes', quizes)

router.use('/fulfillments', fulfillments)

router.use('/trainings', trainings)

export default router
