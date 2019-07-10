import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context) => ({
  title: 'Trainings',
  collection: {
    endpoint: '/api/admin/training/trainings',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'training',
    icon: 'graduation-cap',
    link: (record) => `/admin/training/trainings/${record.id}`,
    new: New
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
