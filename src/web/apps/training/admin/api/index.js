import assignments from './assignments'
import quizes from './quizes'
import trainings from './trainings'
import { Router } from 'express'

const router = new Router({ mergeParams: true })

router.use('/assignments', assignments)

router.use('/:quizable_type/:quizable_id/quizes', quizes)

router.use('/quizes', quizes)

router.use('/trainings', trainings)

export default router
