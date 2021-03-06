import EmailToken from '../../tokens/email'
import { Page } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Emails',
  collection: {
    endpoint: '/api/admin/automation/emails',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'display_name', sort: 'title', primary: true, format: EmailToken },
      { label: 'Program', key: 'program.title', sort: 'program', primary: true },
      { label: 'Sent', key: 'sent', collapsing: true, align: 'right' },
      { label: 'Open Rate', key: 'open_rate', collapsing: true, format: 'rate' },
      { label: 'Click Rate', key: 'click_rate', collapsing: true, format: 'rate' },
      { label: 'Bounce Rate', key: 'bounce_rate', collapsing: true, format: 'rate' }
    ],
    empty: {
      icon: 'envelope-o',
      title: 'No Emails',
      text: 'You have not yet created any emails'
    },
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'email',
    onClick: (record) => context.router.history.push(`/automation/emails/${record.id}`)
  }
})

const mapResourcesToPage = (props, context) => ({
  programs: '/api/admin/crm/programs'
})

export default Page(mapResourcesToPage, mapPropsToPage)
