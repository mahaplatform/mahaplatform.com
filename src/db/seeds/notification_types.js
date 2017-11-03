import { Fixtures } from 'maha'

const notificationTypesFixtures = new Fixtures({
  tableName: 'maha_notification_types',
  records: [
    {
      app_id: 2,
      text: 'item_submitted',
      description: 'someone submits an advance, expense, or trip in a project I own'
    }, {
      app_id: 2,
      text: 'item_rejected',
      description: 'one of my advances, expenses, or trips is rejected'
    }, {
      app_id: 2,
      text: 'item_approved',
      description: 'one of my advances, expenses, or trips is approved'
    }, {
      app_id: 2,
      text: 'item_processed',
      description: 'one of my advances, expenses, or trips is processed'
    }, {
      app_id: 3,
      text: 'plan_created',
      description: 'a supervisor creates a plan for you'
    }, {
      app_id: 3,
      text: 'plan_approved',
      description: 'a supervisor approves your plan'
    }, {
      app_id: 4,
      text: 'opportunity_suggested',
      description: 'a new opportunity is suggested'
    }
  ]
})

export default notificationTypesFixtures
