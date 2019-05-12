import Asset from '../../../models/asset'
import request from 'request'

const downloadRoute = async (req, res) => {

  const asset = await Asset.scope({
    team: req.team
  }).where({
    id: req.params.id
  }).fetch({
    transacting: req.trx
  })

  const host = process.env.DATA_ASSET_CDN_HOST || process.env.DATA_ASSET_HOST || process.env.WEB_HOST

  const file = await new Promise((resolve, reject) => request({
    url: host + asset.get('path'),
    encoding: null
  }, (error, response, body) => {
    if(error) reject(error)
    resolve(body)
  }))

  res.setHeader('Content-disposition', `attachment; filename=${asset.get('file_name')}`)

  res.status(200).type(asset.get('content_type')).send(file)

}

export default downloadRoute
