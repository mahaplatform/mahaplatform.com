import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Groups',
  rights: ['team:manage_people'],
  collection: {
    endpoint: '/api/admin/team/groups',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true },
      { label: 'Leader', key: 'leader.full_name', visible: false }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' },
      { label: 'Leader', key: 'leader.full_name' }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'users',
      title: 'No Groups',
      text: 'You have not yet created any groups',
      buttons: [
        { label: 'Create Group', modal: New }
      ]
    },
    entity: 'group',
    onClick: (record) => context.router.history.push(`/admin/team/groups/${record.id}`)
  },
  task: {
    label: 'New Group',
    icon: 'plus',
    modal: New,
    rights: ['team:manage_people']
  }
})

export default Page(null, mapPropsToPage)
