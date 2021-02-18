import { getSegment } from '../../utils'
import _ from 'lodash'

const dialbyname = async (req, { steps, step }) => {
  const { config } = step
  return {
    config: {
      strategy: config.strategy,
      say: config.say,
      recording_id: config.recording_id
    },
    recipients: config.recipients.map(recipient => ({
      strategy: recipient.strategy,
      say: recipient.say,
      recording_id: recipient.recording_id,
      user_id: recipient.user_id
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

export default dialbyname
