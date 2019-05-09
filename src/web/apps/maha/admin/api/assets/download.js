import Asset from '../../../models/asset'
import { Responder, Route } from '../../../../../core/backframe'
import request from 'request'

const processor = async (req, trx, options) => {

  const id = req.params.id

  const asset = await Asset.where({ id }).fetch({ transacting: trx })

  return asset
}

class DownloadResponder extends Responder {

  async render() {

    const host = process.env.DATA_ASSET_CDN_HOST || process.env.DATA_ASSET_HOST || process.env.WEB_HOST

    const file = await new Promise((resolve, reject) => request({
      url: host + this.data.path,
      encoding: null
    }, (error, response, body) => {
      if(error) reject(error)
      resolve(body)
    }))

    this.res.setHeader('Content-disposition', `attachment; filename=${this.data.file_name}`)

    this.res.status(200).type(this.data.content_type).send(file)

  }

}

const downloadRoute = new Route({
  method: 'get',
  path: '/assets/:id/download',
  processor,
  responder: DownloadResponder
})

export default downloadRoute
