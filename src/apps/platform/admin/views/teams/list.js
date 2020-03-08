import { Page, TeamToken } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Team',
  collection: {
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: TeamToken }
    ],
    endpoint: '/api/admin/platform/teams',
    entity: 'users',
    defaultSort: { key: 'title', order: 'asc' },
    onClick: (record) => context.router.history.push(`/admin/platform/teams/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
