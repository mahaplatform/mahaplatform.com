import ChannelField from './channelfield'

const onUnique = ({ value, network, onValid }) => {
  network.request({
    endpoint: '/api/admin/crm/contacts',
    method: 'get',
    query: {
      $filter: {
        email: {
          $eq: value
        }
      }
    },
    onSuccess: ({ data }) => {
      if(data.length > 0) return onValid(null, ['A contact with this email already exists'])
      onValid(value)
    },
    onFailure: () => {
      onValid(null, ['Unable to validate email'])
    }
  })
}

export default ChannelField({
  entity: 'email address',
  field: { label: 'Email', name: 'address', type: 'emailfield', onUnique },
  format: (item) => item.address
})
