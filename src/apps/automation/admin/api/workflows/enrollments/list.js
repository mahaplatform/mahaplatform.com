import EnrollmentSerializer from '@apps/automation/serializers/enrollment_serializer'
import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import Workflow from '@apps/automation/models/workflow'

const listRoute = async (req, res) => {

  const workflow = await Workflow.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.workflow_id)
  }).fetch({
    transacting: req.trx
  })

  if(!workflow) return res.status(404).respond({
    code: 404,
    message: 'Unable to load workflow'
  })

  const enrollments = await WorkflowEnrollment.filterFetch({
    scope: (qb) => {
      qb.innerJoin('crm_contacts','crm_contacts.id','automation_enrollments.contact_id')
      qb.where('automation_enrollments.team_id', req.team.get('id'))
      qb.where('automation_enrollments.workflow_id', workflow.get('id'))
    },
    aliases: {
      first_name: 'crm_contacts.first_name',
      last_name: 'crm_contacts.last_name'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['status','was_converted'],
      search: ['first_name','last_name']
    },
    sort: {
      params: req.query.$sort,
      defaults:  '-created_at',
      allowed: ['status','created_at']
    },
    page: req.query.$page,
    withRelated: ['contact.photo'],
    transacting: req.trx
  })

  res.status(200).respond(enrollments, EnrollmentSerializer)

}

export default listRoute
