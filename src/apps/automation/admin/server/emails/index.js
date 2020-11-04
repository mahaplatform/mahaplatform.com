import { Router } from 'express'
import preview from './preview'

const router = new Router({ mergeParams: true })

router.get('/campaign/:email_campaign_id/preview', preview)

router.get('/email/:email_id/preview', preview)

router.get('/template/:template_id/preview', preview)

export default router
