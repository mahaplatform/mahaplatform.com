import FormSerializer from '../../../serializers/form_serializer'
import Form from '../../../models/form'

const showRoute = async (req, res) => {

  const form = await Form.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  res.status(200).respond(form, FormSerializer)

}

export default showRoute
