import { Router } from 'express'
import destroy from './destroy'
import create from './create'
import update from './update'
<<<<<<< HEAD
import report from './report'
=======
>>>>>>> adding routes for creating and listing assignments
import edit from './edit'
import list from './list'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/', create)

<<<<<<< HEAD
router.get('/report', report)

=======
>>>>>>> adding routes for creating and listing assignments
router.get('/:id', show)

router.get('/:id/edit', edit)

router.patch('/:id', update)

router.delete('/:id', destroy)

export default router
