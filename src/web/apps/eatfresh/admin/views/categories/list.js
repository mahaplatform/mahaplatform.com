import CategoryToken from '../../components/category_token'
import { Page } from 'maha-admin'
import New from './new'
import Edit from './edit'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Categories',
  collection: {
    endpoint: '/api/admin/eatfresh/categories',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
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
    entity: 'category',
    icon: 'tag'
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
