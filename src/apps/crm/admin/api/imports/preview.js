import parse from '@core/utils/parse'
import Asset from '@apps/maha/models/asset'

const previewRoute = async (req, res) => {

  const asset = await Asset.where({
    id: req.body.asset_id
  }).fetch({
    transacting: req.trx
  })

  const parsed = await parse({
    asset,
    quote: req.body.quote,
    delimiter: req.body.delimiter,
    headers: req.body.headers
  })

  res.status(200).respond(parsed)

}

export default previewRoute
