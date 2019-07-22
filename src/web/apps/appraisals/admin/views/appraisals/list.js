import { Page } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Appraisals',
  collection: {
    endpoint: '/api/admin/appraisals/appraisals',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Supervisor', key: 'supervisor.full_name', primary: true },
      { label: 'Created', key: 'created_at', format: 'date' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'appraisal',
    icon: 'check',
    link: (record) => `/admin/appraisals/appraisals/${record.id}`
  }
})

export default Page(null, mapPropsToPage)
