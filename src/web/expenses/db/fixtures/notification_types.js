import { Fixtures } from 'maha'

const notificationTypesFixtures = new Fixtures({

  tableName: 'maha_notification_types',

  records: {
    
    item_submitted: (data) => ({
      app_id: data.maha_apps.expenses.id,
      text: 'item_submitted',
      description: 'someone submits an advance, expense, or trip in a project I own'
    }),

    item_rejected: (data) => ({
      app_id: data.maha_apps.expenses.id,
      text: 'item_rejected',
      description: 'one of my advances, expenses, or trips is rejected'
    }),

    item_approved: (data) => ({
      app_id: data.maha_apps.expenses.id,
      text: 'item_approved',
      description: 'one of my advances, expenses, or trips is approved'
    }),
    
    item_reviewed: (data) => ({
      app_id: data.maha_apps.expenses.id,
      text: 'item_reviewed',
      description: 'one of my advances, expenses, or trips is reviewed'
    }),

    item_processed: (data) => ({
      app_id: data.maha_apps.expenses.id,
      text: 'item_processed',
      description: 'one of my advances, expenses, or trips is processed'
    })
    
  }

})

export default notificationTypesFixtures
