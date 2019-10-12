import collectObjects from '../../../../utils/collect_objects'
import { Router } from 'express'

const voiceFiles = collectObjects('hooks/voice/index.js')

const router = new Router({ mergeParams: true })

voiceFiles.map(voiceFile => {
  router.use('/voice', voiceFile.default)
})

export default router
