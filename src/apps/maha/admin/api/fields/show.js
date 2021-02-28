import FieldSerializer from '@apps/maha/serializers/field_serializer'
import Field from '@apps/maha/models/field'

const showRoute = async (req, res) => {

  const field = await Field.query(qb => {
    qb.where('parent_type', req.params.parent_type)
    if(req.params.parent_id) {
      qb.where('parent_id', req.params.parent_id)
    }
    qb.where('team_id', req.team.get('id'))
    qb.whereNull('deleted_at')
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  res.status(200).respond(field, FieldSerializer)

}

export default showRoute
