import preferences from './preferences'
import { Router } from 'express'
import forward from './forward'
import forms from './forms'

const router = new Router({ mergeParams: true })

router.use('/forms', forms)

router.use('/forward', forward)

router.use('/preferences', preferences)

router.get('/ips', (req, res) => {
  res.status(200).json({
    ip: req.ip,
    ips: req.ips,
    remote_address: req.connection.remoteAddress,
    x_forwarded_for: req.headers['x-forwarded-for']
  })
})

export default router
