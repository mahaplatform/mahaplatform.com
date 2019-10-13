import TwilioStatusToken from '../../tokens/twilio_status'
import { Page } from 'maha-admin'
import Send from './send'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Faxes',
  collection: {
    endpoint: '/api/admin/team/faxes',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Sent/Received', key: 'created_at', primary: true, format: 'datetime' },
      { label: 'type', key: 'type', primary: true },
      { label: 'From', key: 'from.formatted', primary: true },
      { label: 'To', key: 'to.formatted', primary: true },
      { label: 'Status', key: 'status', primary: true, collapsing: true, format: TwilioStatusToken }
    ],
    empty: 'You have not yet sent or received any faxes',
    entity: 'fax',
    icon: 'fax',
    link: (record) => `/admin/team/faxes/${record.id}`,
    new: Send,
    defaultSort: { key: 'created_at', order: 'desc' }
  },
  task: {
    label: 'New Group',
    icon: 'plus',
    modal: Send,
    rights: ['team:manage_people']
  }
})

export default Page(null, mapPropsToPage)
