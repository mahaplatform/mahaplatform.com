import ChannelField from './channelfield'

export default ChannelField({
  entity: 'email address',
  field: { label: 'Email', name: 'address', type: 'emailfield' },
  format: (item) => item.address
})
