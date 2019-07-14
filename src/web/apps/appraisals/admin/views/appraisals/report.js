import { Page } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Trainings',
  collection: {
    endpoint: '/api/admin/appraisals/appraisals/report',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'training',
    icon: 'check-square',
    link: (record) => `/admin/appraisals/appraisals/${record.id}`
  }
})

export default Page(null, mapPropsToPage)
