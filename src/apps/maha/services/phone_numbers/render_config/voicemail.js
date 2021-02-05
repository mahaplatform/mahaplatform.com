import Asset from '@apps/maha/models/asset'

const play = async (req, { config }) => {

  const recording = await Asset.query(qb => {
    qb.where('id', config.recording_id)
  }).fetch({
    transacting: req.trx
  })

  return {
    play: {
      url: recording.get('signed_url'),
      loop: 0
    }
  }
}

const say = async(req, { config }) => ({
  say: {
    voice: config.voice,
    text: config.text
  }
})

const voicemail = async (req, { steps, step }) => {
  const { config } = step
  const ask = config.strategy === 'play' ? play : say
  return {
    verb: 'voicemail',
    ...await ask(req, { config })
  }
}

export default voicemail
