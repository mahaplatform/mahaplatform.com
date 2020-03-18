import recording from './recording'
import { Router } from 'express'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/:code/recording', recording)

router.post('/:enrollment_code', show)

router.post('/:code/recording', recording)

router.post('/:enrollment_code/:code', show)

router.post('/:enrollment_code/:code/:verb', show)


export default router
