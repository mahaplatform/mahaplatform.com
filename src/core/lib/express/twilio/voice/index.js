import collectObjects from '@core/utils/collect_objects'
import recording from './recording'
import { Router } from 'express'
import receive from './receive'
import status from './status'

const voiceFiles = collectObjects('voice/index.js')

const router = new Router({ mergeParams: true })

voiceFiles.map(middleware => {
  router.use(middleware.config.path, middleware.default)
})

router.post('/status', status)

router.post('/:id/status', status)

router.get('/recordings/:key(*)', recording)

router.post('/', receive)

export default router
