const ChangeStatus = {

  databaseName: 'maha',

  up: async (knex) => {

    const stories = await knex('maha_stories').whereRaw('text like ?', '%reverted%')

    await Promise.map(stories, async (story) => {
      await knex('maha_stories').where({
        id: story.id
      }).update({
        text: story.text.replace('reverted', 'changed')
      })
    })

    await knex('maha_notification_types').where({
      id: 18
    }).update({
      code: 'item_changed'
    })

  },

  down: async (knex) => {
  }

}

export default ChangeStatus
