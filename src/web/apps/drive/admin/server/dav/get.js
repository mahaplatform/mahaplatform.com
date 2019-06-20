import s3 from '../../../../../core/services/s3'

const route = async (req, res) => {

  const asset = req.item.related('asset')

  const data = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: `assets/${asset.get('id')}/${asset.get('file_name')}`
  }).promise().then(file => file.Body)

  res.setHeader('Content-disposition', `attachment; filename=${asset.get('file_name')}`)

  res.status(200).type(asset.get('content_type')).send(data)

}

export default route
