import FormSerializer from '../../../serializers/form_serializer'
import Form from '../../../models/form'

const listRoute = async (req, res) => {

  const forms = await Form.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['program_id']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(forms, FormSerializer)

}

export default listRoute
