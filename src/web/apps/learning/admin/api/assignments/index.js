import materials from './materials'
import complete from './complete'
import { Router } from 'express'
import lessons from './lessons'
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

router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id/complete', complete)

router.patch('/:id', update)

router.delete('/:id', destroy)

router.use('/:assignment_id/lessons', lessons)

router.use('/:assignment_id/materials', materials)

export default router
