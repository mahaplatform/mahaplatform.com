import { Page, TeamToken } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Team',
  collection: {
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true, format: TeamToken }
    ],
    endpoint: '/api/admin/platform/teams',
    entity: 'users',
    link: (record) => `/admin/platform/teams/${record.id}`,
    defaultSort: { key: 'title', order: 'asc' }
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
