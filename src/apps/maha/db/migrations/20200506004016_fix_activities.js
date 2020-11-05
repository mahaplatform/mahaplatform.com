import List from '@apps/crm/models/list'
const FixActivities = {

  up: async (knex) => {
    const lists = await knex('maha_activities').where({
      object_table: 'crm_lists'
    })

    await Promise.map(lists, async (activity) => {
      const list = await List.query(qb => {
        qb.where('id', activity.object_id)
      }).fetch({
        transacting: knex
      })
      await knex('maha_activities').where('id', activity.id).update({
        url: list.get('object_url')
      })
    })
  },

  down: async (knex) => {
  }

}

export default FixActivities
