import download from './download'
import { Router } from 'express'
import upload from './upload'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/download', download)

router.get('/:id', show)

router.get('/:response_id/uploads/:id', upload)

export default router
