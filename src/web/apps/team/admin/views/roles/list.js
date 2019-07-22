import RoleToken from '../../components/role_token'
import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Roles',
  rights: ['team:manage_people'],
  collection: {
    endpoint: '/api/admin/team/roles',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true, RoleToken }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' }
    ],
    empty: 'You have not yet created any roles',
    entity: 'role',
    icon: 'protect',
    link: (record) => `/admin/team/roles/${record.id}`,
    new: New,
    defaultSort: { key: 'title', order: 'asc' }
  },
  task: {
    label: 'New Role',
    icon: 'plus',
    modal: New,
    rights: ['team:manage_people']
  }
})

export default Page(null, mapPropsToPage)
