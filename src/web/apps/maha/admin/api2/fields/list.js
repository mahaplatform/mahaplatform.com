import FieldSerializer from '../../../serializers/field_serializer'
import Field from '../../../models/field'

const listRoute = async (req, res) => {

  const fields = await Field.query(qb => {
    qb.where('parent_type', req.params.parent_type)
    qb.where('parent_id', req.params.parent_id)
    qb.orderBy('delta', 'asc')
  }).scope({
    team: req.team
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(fields, (field) => {
    return FieldSerializer(req, req.trx, field)
  })

}

export default listRoute
