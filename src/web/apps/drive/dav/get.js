import s3 from '../../../core/services/s3'
import MetaFile from '../models/metafile'

const getData = async (req, item) => {

  if(item.get('file_size') === 0) return null

  if(item.get('type') === 'metafile') {

    const file = await MetaFile.query(qb => {
      qb.where('id',item.get('item_id'))
    }).fetch({
      transacting: req.trx
    })

    return file.get('contents')

  }

  return await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: item.get('key')
  }).promise().then(file => file.Body)

}

const route = async (req, res) => {

  try {

    const data = await getData(req, req.item)

    res.setHeader('Content-disposition', `attachment; filename=${req.item.get('label')}`)

    res.status(200).type(req.item.get('content_type')).send(data)

  } catch(err) {

    console.log(err)

    res.status(200).send(null)

  }

}

export default route
