import FieldSerializer from '../../../serializers/field_serializer'
import Field from '../../../models/field'

const showRoute = async (req, res) => {

  const field = await Field.scope(qb => {
    qb.where('parent_type', req.params.parent_type)
    if(req.params.parent_id) {
      qb.where('parent_id', req.params.parent_id)
    }
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  res.status(200).respond(field, FieldSerializer)

}

export default showRoute
