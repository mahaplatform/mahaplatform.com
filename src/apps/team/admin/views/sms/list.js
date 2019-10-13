import TwilioStatusToken from '../../tokens/twilio_status'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Text Messages',
  collection: {
    endpoint: '/api/admin/team/smses',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Sent/Received', key: 'created_at', primary: true, format: 'datetime' },
      { label: 'type', key: 'type', primary: true },
      { label: 'From', key: 'from.formatted', primary: true },
      { label: 'To', key: 'to.formatted', primary: true },
      { label: 'Status', key: 'status', primary: true, collapsing: true, format: TwilioStatusToken }
    ],
    empty: 'You have not yet sent or received any text messages',
    entity: 'messages',
    icon: 'comments',
    defaultSort: { key: 'created_at', order: 'desc' }
  }
})

export default Page(null, mapPropsToPage)
