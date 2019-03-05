import { Asset, Route } from '../../../server'
import parse from '../../../core/utils/parse'

const processor = async (req, trx, options) => {

  const asset = await Asset.where({
    id:req.resource.get('asset_id')
  }).fetch({
    transacting: trx
  })

  return await parse({
    asset,
    quote: req.body.quote,
    delimiter: req.body.delimiter,
    headers: req.body.headers
  })

}

const previewRoute = new Route({
  method: 'post',
  path: '/preview',
  processor
})

export default previewRoute
