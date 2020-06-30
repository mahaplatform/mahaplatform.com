const FixContactActivies = {

  up: async (knex) => {

    const texts = [
      { text: 'received an email campaign', table: 'crm_activities', primary_id: 101 },
      { text: 'enrolled contact in workflow', table: 'crm_activities', primary_id: 2049 },
      { text: 'exported {object}', table: 'maha_notifications', primary_id: 41 },
      { text: 'received an outbound sms campaign', table: 'crm_activities', primary_id: 2037 }
    ]

    await Promise.mapSeries(texts, async({ text, table, primary_id }) => {

      const stories = await knex('maha_stories').where(qb => {
        qb.where('text', text)
        qb.whereNot('id', primary_id)
      })

      await Promise.mapSeries(stories, async (story) => {
        await knex(table).where('story_id', story.id).update('story_id', primary_id)
        await knex('maha_stories').where('id', story.id).del()
      })

    })

  },

  down: async (knex) => {
  }

}

export default FixContactActivies
