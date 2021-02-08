import Asset from '@apps/maha/models/asset'

const play = async (req, { steps, step }) => {
  const { recording_id } = step.config

  const recording = await Asset.query(qb => {
    qb.where('id', recording_id)
  }).fetch({
    transacting: req.trx
  })

  return {
    verb: 'play',
    key: recording.get('key')
  }
}


export default play
