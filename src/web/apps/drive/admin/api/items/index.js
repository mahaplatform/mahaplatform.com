import transfer from './transfer'
import { Router } from 'express'
import restore from './restore'
import archive from './archive'
import destroy from './destroy'
import trash from './trash'
import list from './list'
import show from './show'
import move from './move'

const router = new Router({ mergeParams: true })

router.get('/', list)

router.post('/transfer', transfer)

router.patch('/move', move)

router.patch('/trash', trash)

router.patch('/restore', restore)

router.patch('/destroy', destroy)

router.get('/archive', archive)

router.get('/:code', show)

export default router
