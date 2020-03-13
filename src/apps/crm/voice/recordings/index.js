import { Router } from 'express'
import review from './review'
import create from './create'
import record from './record'

const router = new Router({ mergeParams: true })

router.get('/:code', record)

router.post('/:code/review', review)

router.post('/:code', create)

export default router
