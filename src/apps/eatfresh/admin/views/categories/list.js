import CategoryToken from '../../tokens/category'
import { Page } from 'maha-admin'
import New from './new'
import Edit from './edit'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Categories',
  collection: {
    endpoint: '/api/admin/eatfresh/categories',
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'Title', key: 'title', primary: true, format: CategoryToken }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' }
    ],
    recordTasks: (record) => [
      {
        label: 'Edit Category',
        modal: Edit
      }
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
    entity: 'category'
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
