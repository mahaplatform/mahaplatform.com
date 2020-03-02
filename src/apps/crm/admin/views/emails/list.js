import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Emails',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/emails',
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Program', key: 'program.title', primary: true },
      { label: 'Opened', key: 'opened', width: 100, align: 'right' },
      { label: 'Clicked', key: 'clicked', width: 100, align: 'right' },
      { label: 'Bounced', key: 'bounced', width: 100, align: 'right' },
      { label: 'Unsubscribed', key: 'unsubscribed', width: 100, align: 'right' }
    ],
    empty: {
      icon: 'envelope-o',
      title: 'No Emails',
      text: 'You have not yet created any emails'
    },
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'workflow',
    onClick: (record) => context.router.history.push(`/admin/crm/emails/${record.id}`)
  }
})

const mapResourcesToPage = (props, context) => ({
  programs: {
    endpoint: '/api/admin/crm/programs',
    filter: {
      access_type: {
        $in: ['manage','edit']
      }
    }
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
