import Migration from '../../core/objects/migration'

const FixActivities = new Migration({

  up: async (knex) => {

    await knex('maha_notification_types').where('id', 7).update({
      code: 'attraction_suggested'
    })

    await knex.schema.table('maha_activities', (table) => {
      table.string('object_type')
    })

    await knex.schema.table('maha_notifications', (table) => {
      table.integer('notification_type_id').unsigned()
      table.foreign('notification_type_id').references('maha_notification_types.id')
      table.string('object_type')
    })

    await knex('maha_activities').whereNull('object_table').delete()

    const map = {
      competencies_competencies: 'competency',
      expenses_advances: 'advance',
      competencies_resources: 'resource',
      expenses_trips: 'trip',
      maha_supervisors: 'supervisor',
      expenses_projects: 'project',
      maha_apps: 'app',
      eatfresh_offerings: 'offering',
      eatfresh_attractions: 'attraction',
      maha_emails: 'email',
      maha_users: 'user',
      expenses_expenses: 'expense',
      maha_groups: 'group',
      expenses_expense_types: 'expense type',
      expenses_checks: 'check',
      maha_roles: 'role',
      expenses_reimbursements: 'reimbursement'
    }

    const activities = await knex('maha_activities')

    await Promise.mapSeries(activities, async (activity) => {

      if(!map[activity.object_table]) return

      await knex('maha_activities').where({
        id: activity.id
      }).update({
        object_type: map[activity.object_table]
      })

    })

    await knex('maha_activities').whereRaw('object_table like ?', 'expenses%').update({
      app_id: 2
    })

    const notifications = await knex('maha_notifications')

    await Promise.mapSeries(notifications, async (notification) => {

      if(!map[notification.object_table]) return

      await knex('maha_notifications').where({
        id: notification.id
      }).update({
        object_type: map[notification.object_table]
      })

    })

    await knex('maha_notifications').whereRaw('object_table like ?', 'expenses%').update({
      app_id: 2
    })

    const storyToType = [
      { story_id: 11, notification_type_id: 1 },
      { story_id: 22, notification_type_id: 2 },
      { story_id: 23, notification_type_id: 2 },
      { story_id: 13, notification_type_id: 3 },
      { story_id: 14, notification_type_id: 3 },
      { story_id: 41, notification_type_id: 4 },
      { story_id: 46, notification_type_id: 4 },
      { story_id: 17, notification_type_id: 15 },
      { story_id: 26, notification_type_id: 17 },
      { story_id: 57, notification_type_id: 18 },
      { story_id: 59, notification_type_id: 18 },
      { story_id: 61, notification_type_id: 18 },
      { story_id: 63, notification_type_id: 18 },
      { story_id: 65, notification_type_id: 18 },
      { story_id: 67, notification_type_id: 18 },
      { story_id: 69, notification_type_id: 18 }
    ]

    await Promise.map(storyToType, async (map) => {

      await knex('maha_notifications').where('story_id', map.story_id).update({
        notification_type_id: map.notification_type_id
      })

    })

    await knex.schema.table('maha_notifications', (table) => {
      table.dropColumn('channel_id')
    })

  },

  down: async (knex) => {}

})

export default FixActivities
