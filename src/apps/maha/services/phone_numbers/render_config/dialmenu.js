import { announce, getSegment } from './utils'
import _ from 'lodash'

const dialmenu = async (req, { steps, step }) => {
  const { config } = step
  return {
    verb: 'dialmenu',
    ...await announce(req, config),
    options: await Promise.mapSeries(config.options, async(option) => ({
      number: option.number,
      ...await announce(req, option),
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
