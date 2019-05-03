import Fixtures from '../../../../core/objects/fixtures'

const channelFixtures = new Fixtures({

  tableName: 'chat_channel_types',

  records: [
    {
      id: 1,
      text: 'Channel'    
    }, {
      id: 2,
      text: 'Direct Message'    
    }
  ]

})

export default channelFixtures