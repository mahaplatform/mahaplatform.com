import parse from '../../../../../core/utils/parse'
import Import from '../../../models/import'
import Asset from '../../../models/asset'

const previewRoute = async (req, res) => {

  const _import = await Import.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!_import) return res.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  const asset = await Asset.where({
    id: _import.get('asset_id')
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
