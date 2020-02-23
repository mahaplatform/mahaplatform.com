import { Page } from 'maha-admin'
import New from './new'
import Edit from './edit'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Categories',
  collection: {
    endpoint: '/api/admin/learning/categories',
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'Title', key: 'title', primary: true }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    empty: {
      icon: 'tag',
      title: 'No Categories',
      text: 'You have not yet created any categories',
      buttons: [
        { label: 'Create Category', modal: New }
      ]
    },
    entity: 'category',
    recordTasks: (record) => [
      {
        label: 'Edit Category',
        modal: Edit
      }
    ]
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
