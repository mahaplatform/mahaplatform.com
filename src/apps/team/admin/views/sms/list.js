import { Page, TwilioStatusToken } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Text Messages',
  collection: {
    endpoint: '/api/admin/team/smses',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Sent/Received', key: 'created_at', primary: true, format: 'datetime' },
      { label: 'Direction', key: 'direction' },
      { label: 'From', key: 'from_number.formatted', primary: true },
      { label: 'To', key: 'to_number.formatted', primary: true },
      { label: 'Media', key: 'num_media' },
      { label: 'Price', key: 'price' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: TwilioStatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'comments',
      title: 'No Messages',
      text: 'You have not yet sent or received any text messages'
    },
    entity: 'messages'
  }
})

export default Page(null, mapPropsToPage)
