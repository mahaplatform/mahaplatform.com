import classifications from './classifications'
import competencies from './competencies'
import supervisors from './supervisors'
import categories from './categories'
import employees from './employees'
import resources from './resources'
import { Router } from 'express'
import plans from './plans'

const router = new Router({ mergeParams: true })

router.use('/categories', categories)

router.use('/classifications', classifications)

router.use('/competencies', competencies)

router.use('/employees', employees)

router.use('/plans', plans)

router.use('/resources', resources)

router.use('/supervisors', supervisors)

export default router
