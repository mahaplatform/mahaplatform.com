import enrollment from './enrollment'
import download from './download'
import { Router } from 'express'
import actions from './actions'
import upload from './upload'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/download', download)

router.get('/:id', show)

router.get('/:id/actions', actions)

router.get('/:id/enrollment', enrollment)

router.get('/:response_id/uploads/:id', upload)

export default router
