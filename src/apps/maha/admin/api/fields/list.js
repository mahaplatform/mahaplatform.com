import FieldSerializer from '../../../serializers/field_serializer'
import Field from '../../../models/field'

const listRoute = async (req, res) => {

  const fields = await Field.scope(qb => {
    qb.where('parent_type', req.params.parent_type)
    if(req.params.parent_id) {
      qb.where('parent_id', req.params.parent_id)
    }
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.orderBy('delta', 'asc')
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(fields, FieldSerializer)

}

export default listRoute
