import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Groups',
  rights: ['team:manage_people'],
  collection: {
    endpoint: '/api/admin/team/groups',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' }
    ],
    empty: 'You have not yet created any groups',
    entity: 'group',
    icon: 'sitemap',
    link: (record) => `/admin/team/groups/${record.id}`,
    new: New,
    defaultSort: { key: 'title', order: 'asc' }
  },
  task: {
    label: 'New Group',
    icon: 'plus',
    modal: New,
    rights: ['team:manage_people']
  }
})

export default Page(null, mapPropsToPage)
