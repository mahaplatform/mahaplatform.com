import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Classifications',
  collection: {
    endpoint: '/api/admin/competencies/classifications',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'classification',
    icon: 'briefcase',
    link: (record) => `/admin/competencies/classifications/${record.id}`,
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
