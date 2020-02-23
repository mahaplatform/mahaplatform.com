import { Page, TwilioStatusToken } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Calls',
  collection: {
    endpoint: '/api/admin/team/calls',
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'Sent/Received', key: 'created_at', primary: true, format: 'datetime' },
      { label: 'Direction', key: 'direction', primary: true },
      { label: 'From', key: 'from.formatted', primary: true },
      { label: 'To', key: 'to.formatted', primary: true },
      { label: 'Duration', key: 'duration', primary: true },
      { label: 'Price', key: 'price', primary: true },
      { label: 'Status', key: 'status', width: 100, primary: true, format: TwilioStatusToken }
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
