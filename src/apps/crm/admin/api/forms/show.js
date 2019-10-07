import FormSerializer from '../../../serializers/form_serializer'
import Form from '../../../models/form'

const showRoute = async (req, res) => {

  const form = await Form.scope({
    team: req.team
  }).query(qb => {
    qb.where('program_id', req.params.program_id)
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  res.status(200).respond(form, FormSerializer)

}

export default showRoute
