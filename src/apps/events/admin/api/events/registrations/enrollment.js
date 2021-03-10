import EnrollmentSerializer from '@apps/automation/serializers/enrollment_serializer'
import Registration from '@apps/events/models/registration'

const enrollmentRoute = async (req, res) => {

  const registration = await Registration.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('event_id', req.params.event_id)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['enrollment.contact'],
    transacting: req.trx
  })

  if(!registration) return res.status(404).respond({
    code: 404,
    message: 'Unable to load registration'
  })

  await res.status(200).respond(registration.related('enrollment'), EnrollmentSerializer)

}

export default enrollmentRoute
