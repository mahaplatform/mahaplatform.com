import { Page } from 'maha-admin'
import New from './new'
import Edit from './edit'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Categories',
  collection: {
    endpoint: '/api/admin/competencies/categories',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'category',
    icon: 'tag',
    recordTasks: (record) => [
      {
        label: 'Edit Category',
        modal: Edit
      }
    ],
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
