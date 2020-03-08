import { Page } from 'maha-admin'
import New from './new'
import Edit from './edit'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Counties',
  collection: {
    endpoint: '/api/admin/eatfresh/counties',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
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
    empty: {
      icon: 'map-o',
      title: 'No Counties',
      text: 'You have not yet created any counties',
      buttons: [
        { label: 'Create County', modal: New }
      ]
    },
    entity: 'county'
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
