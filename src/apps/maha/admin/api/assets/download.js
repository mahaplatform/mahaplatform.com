import s3 from '../../../../../core/services/s3'
import Asset from '../../../models/asset'

const downloadRoute = async (req, res) => {

  const asset = await Asset.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  const data = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: asset.get('key')
  }).promise().then(file => file.Body)

  res.setHeader('Content-disposition', `attachment; filename=${asset.get('file_name')}`)

  res.status(200).type(asset.get('content_type')).send(data)

}

export default downloadRoute
