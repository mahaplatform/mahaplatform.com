import WorkflowEnrollment from '@apps/crm/models/enrollment'
import { contactActivity } from '@apps/crm/services/activities'
import User from '@apps/maha/models/user'
import moment from 'moment'

const AddListEnrollmentActivities = {

  up: async (knex) => {

    const req = {}

    req.user = await User.query(qb => {
      qb.where('id', 311)
    }).fetch({
      withRelated: ['team'],
      transacting: knex
    })

    req.team = req.user.related('team')

    const enrollments = await WorkflowEnrollment.query(qb => {
      qb.where('workflow_id', 92)
    }).fetchAll({
      withRelated: ['contact', 'workflow'],
      transacting: knex
    })

    await Promise.mapSeries(enrollments, async (enrollment) => {
      await contactActivity(req, {
        contact: enrollment.related('contact'),
        type: 'workflow',
        story: 'enrolled contact in workflow',
        program_id: enrollment.related('workflow').get('program_id'),
        user: req.user,
        data: {
          workflow_id: enrollment.related('workflow').get('id'),
          enrollment_id: enrollment.get('id')
        },
        created_at: moment(enrollment.get('created_at')).add(10, 'seconds'),
        updated_at: moment(enrollment.get('updated_at')).add(10, 'seconds')
      })
    })

  },

  down: async (knex) => {
  }

}

export default AddListEnrollmentActivities
