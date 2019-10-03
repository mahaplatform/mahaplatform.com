import { Page } from 'maha-admin'
import New from './new'
import Edit from './edit'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Counties',
  collection: {
    endpoint: '/api/admin/eatfresh/counties',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Name', key: 'name', primary: true }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' }
    ],
    recordTasks: (record) => [
      {
        label: 'Edit County',
        modal: Edit
      }
    ],
    defaultSort: { key: 'name', order: 'asc' },
    entity: 'county',
    icon: 'map-o'
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
