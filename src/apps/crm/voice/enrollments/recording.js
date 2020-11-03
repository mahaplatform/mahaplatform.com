import WorkflowStep from '../../../automation/models/workflow_step'
import Asset from '../../../maha/models/asset'
import s3 from '../../../../core/services/s3'

const recordingRoute = async (req, res) => {

  const step = await WorkflowStep.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  if(!step) return res.status(404).respond({
    code: 404,
    message: 'Unable to load step'
  })

  req.team = step.related('team')

  const asset = await Asset.query(qb => {
    qb.where('id', step.get('config').recording_id)
  }).fetch({
    transacting: req.trx
  })

  const recording = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: asset.get('key')
  }).promise()

  res.header('Cache-Control', `max-age: ${60*60*24*7}`)

  res.status(200).type(asset.get('content_type')).send(recording.Body)

}

export default recordingRoute
