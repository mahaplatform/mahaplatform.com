import { Router } from 'express'
import special from './special'
import folders from './folders'
import access from './access'
import files from './files'
import share from './share'
import trash from './trash'
import items from './items'

const router = new Router({ mergeParams: true })

router.use(special)

router.use('/folders', folders)

router.use('/files', files)

router.use('/trash', trash)

router.use('/share', share)

router.use('/items', items)

router.use('/items/:code/access', access)

export default router
