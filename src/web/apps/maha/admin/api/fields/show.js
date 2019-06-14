import FieldSerializer from '../../../serializers/field_serializer'
import Field from '../../../models/field'

const showRoute = async (req, res) => {

  const field = await Field.scope({
    team: req.team
  }).query(qb => {
    qb.where('parent_type', req.params.parent_type)
    qb.where('parent_id', req.params.parent_id)
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  res.status(200).respond(field, (field) => {
    return FieldSerializer(req, field)
  })

}

export default showRoute
