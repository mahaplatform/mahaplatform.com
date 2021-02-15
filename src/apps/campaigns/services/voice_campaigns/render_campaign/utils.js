import dialbyextension from './dialbyextension'
import Asset from '@apps/maha/models/asset'
import dialbyname from './dialbyname'
import timeofday from './timeofday'
import voicemail from './voicemail'
import dialmenu from './dialmenu'
import play from './play'

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

const getCreator = ({ action, config, type }) => {
  if(action === 'dialbyextension') return dialbyextension
  if(action === 'dialbyname') return dialbyname
  if(action === 'timeofday') return timeofday
  if(action === 'voicemail') return voicemail
  if(action === 'dialmenu') return dialmenu
  if(action === 'play') return play
  return () => config
}

const getStep = async (req, { steps, step }) => {
  const creator = getCreator(step)
  if(!creator) return {}
  return await creator(req, {
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
    type: step.type,
    action: step.action,
    config: await getStep(req, {
      steps,
      step
    })
  }))
}
