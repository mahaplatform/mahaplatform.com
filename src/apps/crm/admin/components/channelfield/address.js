import ChannelField from './channelfield'

export default ChannelField({
  entity: 'mailing address',
  field: { label: 'Address', name: 'address', type: 'addressfield' },
  text: (item) => item.address.description
})
