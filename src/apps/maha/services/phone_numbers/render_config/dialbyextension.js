import { announce, getSegment } from './utils'
import _ from 'lodash'

const dialbyextension = async (req, { steps, step }) => {
  const { config } = step
  return {
    verb: 'dialbyextension',
    ...await announce(req, {
      strategy: config.strategy,
      voice: config.voice,
      text: config.text,
      recording_id: config.recording_id
    }),
    extensions: await Promise.mapSeries(config.extensions, async(extension) => ({
      extension: extension.extension,
      ...await announce(req, {
        strategy: extension.strategy,
        voice: extension.voice,
        text: extension.text,
        recording_id: extension.recording_id
      }),
      steps: await getSegment(req, {
        steps,
        parent: step.code,
        answer: extension.code
      }),
      ..._.includes(config.specials, 'hash') ? {
        hash: {
          steps: await getSegment(req, {
            steps,
            parent: step.code,
            answer: 'hash'
          })
        }
      } : {},
      ..._.includes(config.specials, 'star') ? {
        star: {
          steps: await getSegment(req, {
            steps,
            parent: step.code,
            answer: 'star'
          })
        }
      } : {}
    }))
  }
}

export default dialbyextension
