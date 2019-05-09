import request from 'request-promise'

const route = async (req, res) => {
  const asset = req.item.related('asset')
  const host = process.env.DATA_ASSET_CDN_HOST || process.env.DATA_ASSET_HOST || process.env.WEB_HOST
  const data = await new Promise((resolve, reject) => request({
    url: host + asset.get('path'),
    encoding: null
  }, (error, response, body) => {
    if(error) reject(error)
    resolve(body)
  }))
  res.setHeader('Content-disposition', `attachment; filename=${asset.get('file_name')}`)
  res.status(200).type(asset.get('content_type')).send(data)
}

export default route
