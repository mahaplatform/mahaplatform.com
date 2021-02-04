import Asset from '@apps/maha/models/asset'

const play = async (req, { steps, step }) => {
  const { loop, recording_id } = step.config

  const recording = await Asset.query(qb => {
    qb.where('id', recording_id)
  }).fetch({
    transacting: req.trx
  })

  return {
    verb: 'play',
    loop,
    url: recording.get('signed_url')
  }
}


export default play
