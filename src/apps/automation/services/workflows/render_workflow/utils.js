import Asset from '@apps/maha/models/asset'
import executors from './steps'
import _ from 'lodash'

const announcePlay = async (req, config) => {
  const recording = await Asset.query(qb => {
    qb.where('id', config.recording_id)
  }).fetch({
    transacting: req.trx
  })
  return {
    play: {
      key: recording.get('key')
    }
  }
}

const announceSay = async(req, config) => ({
  say: config.say
})

const getAnnounceVerb = (strategy) => {
  if(strategy === 'play') return announcePlay
  if(strategy === 'say') return announceSay
  return null
}

export const announce = async(req, config) => {
  const verb = getAnnounceVerb(config.strategy)
  return verb ? await verb(req, config) : {}
}

const getStep = async (req, { steps, step }) => {
  const defaultExecutor = () => step.config
  const executor = _.get(executors, `${step.type}.${step.action}`) || defaultExecutor
  return await executor(req, {
    steps,
    step
  })
}

export const getSegment = async (req, { steps, parent, answer }) => {
  const filtered = steps.filter((step) => {
    return step.parent === parent && step.answer === answer
  }).sort((a, b) => {
    return a.delta < b.delta ? -1 : 1
  })
  return await Promise.mapSeries(filtered, async(step) => ({
    code: step.code,
    type: step.type,
    action: step.action,
    ...await getStep(req, {
      steps,
      step
    })
  }))
}
