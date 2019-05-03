import Fixtures from '../../../../core/objects/fixtures'

const notificationTypesFixtures = new Fixtures({

  tableName: 'maha_notification_types',

  records: {

    plan_created: (data) => ({
      app_id: data.maha_apps.expenses.id,
      text: 'plan_created',
      description: 'a supervisor creates a plan for you'
    }),

    plan_approved: (data) => ({
      app_id: data.maha_apps.expenses.id,
      text: 'plan_created',
      description: 'a supervisor creates a plan for you'
    })

  }

})

export default notificationTypesFixtures
