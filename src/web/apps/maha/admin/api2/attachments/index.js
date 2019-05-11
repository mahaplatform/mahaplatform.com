import { Router } from 'express'
import show from './show'

const router = new Router({ mergeParams: true })

router.get('/attachments/:attachable_type/:attachable_id', show)

export default router
