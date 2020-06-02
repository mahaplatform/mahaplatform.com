import recording from './recording'
import { Router } from 'express'
import record from './record'
import gather from './gather'
import dial from './dial'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code/recording', recording)

router.post('/:enrollment_code', show)

router.post('/:enrollment_code/recording', recording)

router.post('/:enrollment_code/:code', show)

router.post('/:enrollment_code/:code/dial', dial)

router.post('/:enrollment_code/:code/gather', gather)

router.post('/:enrollment_code/:code/record', record)

router.post('/:enrollment_code/:code/:verb', show)

export default router
