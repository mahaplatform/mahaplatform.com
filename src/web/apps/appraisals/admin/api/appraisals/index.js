import employees from './employees'
import download from './download'
import { Router } from 'express'
import destroy from './destroy'
import report from './report'
import create from './create'
import update from './update'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.get('/employees', employees)

router.get('/report', report)

router.post('/', create)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.get('/:id/download', download)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
