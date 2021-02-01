import { Page, TwilioStatusToken } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Calls',
  collection: {
    endpoint: '/api/admin/team/calls',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Sent/Received', key: 'created_at', primary: true, format: 'datetime' },
      { label: 'Direction', key: 'direction', primary: true },
      { label: 'From', key: 'from_number.formatted', primary: true },
      { label: 'To', key: 'to_number.formatted', primary: true },
      { label: 'Duration', key: 'duration', collapsing: true, primary: true, format: 'duration', align: 'right' },
      { label: 'Price', key: 'price', collapsing: true, primary: true, align: 'right' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: TwilioStatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'phone',
      title: 'No Calls',
      text: 'You have not yet sent or received any calls'
    },
    entity: 'call'
  }
})

export default Page(null, mapPropsToPage)
