import EnrollmentSerializer from '../../../../serializers/enrollment_serializer'
import WorkflowAction from '../../../../models/workflow_action'
import Response from '../../../../models/response'
import Form from '../../../../models/form'

const enrollmentRoute = async (req, res) => {

  const form = await Form.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.form_id)
  }).fetch({
    widthRelated: ['workflow'],
    transacting: req.trx
  })

  if(!form) return res.status(404).respond({
    code: 404,
    message: 'Unable to load form'
  })

  const response = await Response.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('form_id', form.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['enrollment'],
    transacting: req.trx
  })

  res.status(200).respond(response.related('enrollment'), EnrollmentSerializer)

}

export default enrollmentRoute
