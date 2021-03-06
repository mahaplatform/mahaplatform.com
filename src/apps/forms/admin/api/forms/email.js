import EmailSerializer from '@apps/automation/serializers/email_serializer'
import Form from '@apps/forms/models/form'

const emailRoute  = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['email.program'],
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  await res.status(200).respond(form.related('email'), EmailSerializer)

}

export default emailRoute
