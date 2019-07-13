import employees from './employees'
import { Router } from 'express'
import options from './options'
import destroy from './destroy'
import create from './create'
import update from './update'
import report from './report'
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

router.get('/report', report)

router.get('/employees', employees)

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.get('/:id/options', options)

export default router
