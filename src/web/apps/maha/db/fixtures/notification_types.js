import Fixtures from '../../../../core/objects/fixtures'

const notificationTypesFixtures = new Fixtures({

  tableName: 'maha_notification_types',

  records: {
    
    comment: (data) => ({
      app_id: data.maha_apps.team.id,
      text: 'item_comment',
      description: 'someone comments on an item Im affiliated with'
    })
    
  }

})

export default notificationTypesFixtures
