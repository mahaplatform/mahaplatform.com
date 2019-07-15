import { Page } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Appraisals',
  collection: {
    endpoint: '/api/admin/appraisals/appraisals',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Title', key: 'title', primary: true }
    ],
    defaultSort: { key: 'title', order: 'asc' },
    entity: 'appraisal',
    icon: 'check',
    link: (record) => `/admin/appraisals/appraisals/${record.id}`
  }
})

export default Page(null, mapPropsToPage)
