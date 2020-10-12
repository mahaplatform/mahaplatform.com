import { Page } from 'maha-admin'
import EmailToken from '../../tokens/email'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Email',
  rights: ['team:manage_team'],
  collection: {
    endpoint: '/api/admin/team/emails',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'To', key: 'to', visible: false },
      { label: 'Subject', key: 'subject', primary: true, format: EmailToken },
      { label: 'Status', key: 'status', visible: false },
      { label: 'Sent At', key: 'sent_at', visible: false }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'To', key: 'to' },
      { label: 'Subject', key: 'subject' },
      { label: 'Status', key: 'status' },
      { label: 'Sent At', key: 'sent_at' }
    ],
    filters: [
      { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/api/admin/team/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' } },
      { label: 'Sent', name: 'sent_at', type: 'daterange', include: ['this','last'] }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'envelope',
      title: 'No Emails',
      text: 'You have not yet sent any emails'
    },
    entity: 'email',
    onClick: (record) => context.router.history.push(`/emails/${record.code}`)
  }
})

export default Page(null, mapPropsToPage)
