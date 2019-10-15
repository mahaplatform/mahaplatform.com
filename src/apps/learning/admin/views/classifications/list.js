import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Classifications',
  collection: {
    endpoint: '/api/admin/learning/classifications',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'briefcase',
      title: 'No Classifications',
      text: 'You have not yet created any classifications',
      buttons: [
        { label: 'Create Classification', modal: New }
      ]
    },
    entity: 'classification',
    link: (record) => `/admin/learning/classifications/${record.id}`
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
