import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Emails',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/emails',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Program', key: 'program.title', sort: 'program', primary: true },
      { label: 'Opened', key: 'opened', collapsing: true, align: 'right' },
      { label: 'Clicked', key: 'clicked', collapsing: true, align: 'right' },
      { label: 'Bounced', key: 'bounced', collapsing: true, align: 'right' },
      { label: 'Unsubscribed', key: 'unsubscribed', collapsing: true, align: 'right' }
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
