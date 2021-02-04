import Asset from '@apps/maha/models/asset'

const play = async (req, { config }) => {
  const { loop, recording_id } = config

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
