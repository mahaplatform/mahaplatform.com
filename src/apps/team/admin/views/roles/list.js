import RoleToken from '../../components/role_token'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Roles',
  rights: ['team:manage_people'],
  collection: {
    endpoint: '/api/admin/team/roles',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, RoleToken }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'sitemap',
      title: 'No Roles',
      text: 'You have not yet created any roles',
      buttons: [
        { label: 'Create Role', modal: New }
      ]
    },
    entity: 'role',
    onClick: (record) => context.router.history.push(`/team/roles/${record.id}`)
  },
  task: {
    label: 'New Role',
    icon: 'plus',
    modal: New,
    rights: ['team:manage_people']
  }
})

export default Page(null, mapPropsToPage)
