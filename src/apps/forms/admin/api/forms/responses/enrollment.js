import EnrollmentSerializer from '@apps/automation/serializers/enrollment_serializer'
import Response from '@apps/forms/models/response'

const enrollmentRoute = async (req, res) => {

  const response = await Response.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('form_id', req.params.form_id)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['enrollment.contact'],
    transacting: req.trx
  })

  if(!response) return res.status(404).respond({
    code: 404,
    message: 'Unable to load response'
  })

  res.status(200).respond(response.related('enrollment'), EnrollmentSerializer)

}

export default enrollmentRoute
