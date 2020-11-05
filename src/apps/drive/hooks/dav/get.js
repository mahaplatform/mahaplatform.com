import s3 from '@core/services/s3'

const getData = async (req, item) => {

  if(item.get('file_size') === 0) return null

  return await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: item.get('key')
  }).promise().then(file => file.Body)

}

const getRoute = async (req, res) => {

  try {

    const data = await getData(req, req.item)

    res.setHeader('Content-disposition', `attachment; filename=${req.item.get('label')}`)

    res.status(200).type(req.item.get('content_type')).send(data)

  } catch(err) {

    console.log(err)

    res.status(200).send(null)

  }

}

export default getRoute
