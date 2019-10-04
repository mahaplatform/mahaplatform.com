import FormSerializer from '../../../../serializers/form_serializer'
import Form from '../../../../models/form'

const listRoute = async (req, res) => {

  const forms = await Form.scope({
    team: req.team
  }).query(qb => {
    qb.where('program_id', req.params.program_id)
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(forms, FormSerializer)

}

export default listRoute
