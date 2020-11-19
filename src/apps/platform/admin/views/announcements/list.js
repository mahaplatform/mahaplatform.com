import StatusToken from '@apps/campaigns/admin/tokens/status'
import { Page } from '@admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Announcements',
  collection: {
    endpoint: '/api/admin/platform/announcements',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Sent', key: 'sent', collapsing: true, align: 'right' },
      { label: 'Open Rate', key: 'open_rate', collapsing: true, format: 'rate' },
      { label: 'Click Rate', key: 'click_rate', collapsing: true, format: 'rate' },
      { label: 'Bounce Rate', key: 'bounce_rate', collapsing: true, format: 'rate' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: StatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'bullhorn',
      title: 'No Announcement',
      text: 'You have not yet created any announcements',
      buttons: [
        { label: 'Create Announcement', modal: New }
      ]
    },
    entity: 'announcement',
    onClick: (record) => context.router.history.push(`/platform/announcements/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
