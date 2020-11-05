import Registration from '@apps/events/models/registration'
import { contactActivity } from '@apps/crm/services/activities'
import moment from 'moment'

const imports = async (knex) => {

  const activities = await knex('crm_activities').where({
    story_id: 89
  })

  await Promise.mapSeries(activities, async (activity) => {

    const items = await knex('maha_imports_import_items').where({
      object_type: 'crm_contacts',
      object_id: activity.contact_id
    })

    const imp = await knex('maha_imports').where({
      id: items[0].import_id
    })

    await knex('crm_activities').where('id', activity.id).update({
      type: 'import',
      program_id: imp[0].program_id,
      data: {
        import_id: items[0].import_id,
        import_item_id: items[0].id
      }
    })

  })

}

const responses = async (knex) => {

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

}

const registration = async (knex) => {

  await knex('crm_activities').where('type', 'event').delete()

  const registrations = await Registration.fetchAll({
    withRelated: ['contact','event','team'],
    transacting: knex
  })
  await Promise.mapSeries(registrations, async (registration) => {
    const activity = await contactActivity({
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

    await knex('crm_activities').where('id', activity.get('id')).update({
      created_at: moment(),
      updated_at: moment()
    })

  })

}

const UpdateActivities = {

  up: async (knex) => {

    await imports(knex)

    await responses(knex)

    await registration(knex)

  },

  down: async (knex) => {
  }

}

export default UpdateActivities
