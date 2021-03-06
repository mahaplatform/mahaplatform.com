import Import from '@apps/maha/models/import'

const destroyRoute = async (req, res) => {

  const _import = await Import.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['items'],
    transacting: req.trx
  })

  if(!_import) return res.status(404).respond({
    code: 404,
    message: 'Unable to load import'
  })

  await Promise.mapSeries(_import.related('items').toArray(), async (item) => {
    await item.destroy({
      transacting: req.trx
    })
  })

  await _import.destroy({
    transacting: req.trx
  })

  await res.status(200).respond(true)

}

export default destroyRoute
