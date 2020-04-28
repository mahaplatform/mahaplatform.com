import Registration from '../../../events/models/registration'
import { contactActivity } from '../../services/activities'

const UpdateActivities = {

  up: async (knex) => {

    const responses = await knex('crm_activities').where({
      type: 'form'
    })
    await Promise.mapSeries(responses, async (activity) => {
      await knex('crm_activities').where('id', activity.id).update({
        type: 'response',
        data: {
          form_id: activity.data.form.id,
          response_id: activity.data.response.id
        }
      })
    })

    const registrations = await Registration.fetchAll({
      withRelated: ['contact','event','team'],
      transacting: knex
    })
    await Promise.mapSeries(registrations, async (registration) => {
      await contactActivity({
        trx: knex,
        team: registration.related('team')
      }, {
        contact: registration.related('contact'),
        type: 'registration',
        story: 'registered for an event',
        program_id: registration.related('event').get('program_id'),
        data: {
          event_id: registration.get('event_id'),
          registration_id: registration.get('id')
        }
      })
    })
  },

  down: async (knex) => {
  }

}

export default UpdateActivities
