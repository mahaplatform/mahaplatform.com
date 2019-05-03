import Migration from '../../../../core/objects/migration'

const CreateLinks = new Migration({

  up: async (knex) => {

    await knex.schema.createTable('maha_notification_methods', (table) => {
      table.increments('id').primary()
      table.string('icon')
      table.string('title')
      table.string('text')
    })

    await knex('maha_notification_methods').insert([
      { icon: 'clock-o', title: 'On Demand', text: 'Send me an email whenever I miss a notification' },
      { icon: 'calendar', title: 'Daily Digest', text: 'Send me a daily email with all of my missed notifcations from the previous day' },
      { icon: 'ban', title: 'Do nothing', text: 'Please do not send me any notifications via email' }
    ])

    await knex.schema.table('maha_users', (table) => {
      table.integer('notification_method_id').unsigned()
      table.foreign('notification_method_id').references('maha_notification_methods.id')
    })

    const users = await knex('maha_users')

    await Promise.mapSeries(users, async (user) => {
      if(user.notification_method === 'immediately') {
        return await knex('maha_users').where({ id: user.id }).update({ notification_method_id: 1 })
      } else if(user.notification_method === 'daily') {
        return await knex('maha_users').where({ id: user.id }).update({ notification_method_id: 2 })
      } else if(user.notification_method === 'nothing') {
        return await knex('maha_users').where({ id: user.id }).update({ notification_method_id: 3 })
      }
    })

    await knex.schema.table('maha_users', (table) => {
      table.dropColumn('notification_method')
    })

  },

  down: async (knex) => {
    
    await knex.schema.table('maha_users', (table) => {
      table.dropColumn('notification_method_id')
    })

    await knex.schema.dropTable('maha_notification_methods')
    
  }

})

export default CreateLinks
