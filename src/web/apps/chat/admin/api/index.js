import subscriptions from './subscriptions'
import messages from './messages'
import channels from './channels'
import { Router } from 'express'
import search from './search'
import unread from './unread'

const router = new Router({ mergeParams: true })

router.use('/search', search)

router.use('/unread', unread)

router.use('/channels', channels)

router.use('/channels/:id/subscriptions', subscriptions)

router.use('/channels/:channel_id/messages', messages)

export default router
