import fulfillments from './fulfillments'
import assignments from './assignments'
import assignings from './assignings'
import trainings from './trainings'
import offerings from './offerings'
import { Router } from 'express'
import quizes from './quizes'

const router = new Router({ mergeParams: true })

router.use('/assignings', assignings)

router.use('/assignments', assignments)

router.use('/quizes', quizes)

router.use('/fulfillments', fulfillments)

router.use('/offerings', offerings)

router.use('/trainings', trainings)

router.use('/:quizable_type/:quizable_id/quizes', quizes)

export default router
