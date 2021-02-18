import { getSegment } from '../../utils'
import _ from 'lodash'

const dialmenu = async (req, { steps, step }) => {
  const { config } = step
  return {
    config: {
      strategy: config.strategy,
      say: config.say,
      recording_id: config.recording_id      
    },
    options: await Promise.mapSeries(config.options, async(option) => ({
      number: option.number,
      strategy: config.strategy,
      say: config.say,
      recording_id: config.recording_id,
      steps: await getSegment(req, {
        steps,
        parent: step.code,
        answer: option.code
      })
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
    noinput: {
      steps: await getSegment(req, {
        steps,
        parent: step.code,
        answer: 'noinput'
      })
    }
  }
}

export default dialmenu
