import { getSegment } from '../../utils'
import _ from 'lodash'

const dialbyextension = async (req, { steps, step }) => {
  const { config } = step
  return {
    strategy: config.strategy,
    say: config.say,
    recording_id: config.recording_id,
    extensions: config.extensions.map(extension => ({
      extension: extension.extension,
      strategy: extension.strategy,
      say: extension.say,
      recording_id: extension.recording_id,
      recipients: extension.recipients
    })),
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
    } : {},
    noanswer: {
      steps: await getSegment(req, {
        steps,
        parent: step.code,
        answer: 'noanswer'
      })
    },
    noinput: {
      steps: await getSegment(req, {
        steps,
        parent: step.code,
        answer: 'noinput'
      })
    }
  }
}

export default dialbyextension
