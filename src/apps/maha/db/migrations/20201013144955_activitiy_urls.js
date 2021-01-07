import Contact from '@apps/crm/models/contact'

const ActivitiyUrls = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw('update maha_activities set url=replace(url, \'/admin\',\'\')')
    await knex.raw('update maha_notifications set url=replace(url, \'/admin\',\'\')')

    const activities = await knex('maha_activities').where('object_table', 'crm_contacts')

    await Promise.mapSeries(activities, async activity => {
      const contact = await Contact.where('id', activity.object_id).fetch({
        transacting: knex
      })
      await knex('maha_activities').where('id', activity.id).update({
        object_type: contact.get('object_type'),
        url: contact.get('object_url')
      })
    })

  },

  down: async (knex) => {
  }

}

export default ActivitiyUrls
