import OfferingToken from '../../components/offering_token'
import { Page } from 'maha-admin'
import New from './new'
import Edit from './edit'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Offerings',
  collection: {
    endpoint: '/api/admin/eatfresh/offerings',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true, format: OfferingToken }
    ],
    export: [
      { label: 'ID', key: 'id' },
      { label: 'Title', key: 'title' }
    ],
    recordTasks: (record) => [
      {
        label: 'Edit Offering',
        modal: Edit
      }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'offering',
    icon: 'check-circle'
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
