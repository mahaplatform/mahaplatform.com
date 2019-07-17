import download from './download'
import { Router } from 'express'
import preview from './preview'
import proces from './process'
import upload from './upload'
import print from './print'
import list from './list'
import show from './show'
import url from './url'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.use('/url', url)

router.use('/upload', upload)

router.get('/:id', show)

router.get('/:id/preview', preview)

router.get('/:id/print', print)

router.get('/:id/download', download)

router.get('/:id/process', proces)

export default router
