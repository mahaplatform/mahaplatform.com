import { Fixtures } from 'maha'

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