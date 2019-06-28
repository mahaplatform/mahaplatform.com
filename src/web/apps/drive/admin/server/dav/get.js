import s3 from '../../../../../core/services/s3'

const getData = async (asset) => {

  if(asset.get('file_size') === 0) return null

  return await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: asset.get('key')
  }).promise().then(file => file.Body)

}

const route = async (req, res) => {

  try {

    const asset = req.item.related('asset')

    const data = await getData(asset)

    res.setHeader('Content-disposition', `attachment; filename=${asset.get('file_name')}`)

    res.status(200).type(asset.get('content_type')).send(data)

  } catch(err) {

    res.status(200).send(null)

  }

}

export default route
