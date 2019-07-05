import classifications from './classifications'
import competencies from './competencies'
import assignments from './assignments'
import supervisors from './supervisors'
import categories from './categories'
import employees from './employees'
import resources from './resources'
import trainings from './trainings'
import { Router } from 'express'
import plans from './plans'

const router = new Router({ mergeParams: true })

router.use('/assignments', assignments)

router.use('/categories', categories)

router.use('/classifications', classifications)

router.use('/competencies', competencies)

router.use('/employees', employees)

router.use('/plans', plans)

router.use('/resources', resources)

router.use('/supervisors', supervisors)

router.use('/trainings', trainings)

export default router
