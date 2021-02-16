import Asset from '@apps/maha/models/asset'
import { getObject } from '@core/services/aws/s3'

const showRoute = async (req, res) => {

  const asset = await Asset.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!asset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load recording'
  })

  const recording = await getObject(req, {
    key: asset.get('key')
  })

  res.set('Cache-Control', 'max-age=259200')

  res.status(200).type(recording.ContentType).send(recording.Body)

}

export default showRoute
