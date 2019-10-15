import TypeSerializer from '../../../serializers/type_serializer'
import Type from '../../../models/type'

const listRoute = async (req, res) => {

  const types = await Type.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('site_id', req.params.site_id)
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title',
    sortParams: ['title']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(types, TypeSerializer)

}

export default listRoute
