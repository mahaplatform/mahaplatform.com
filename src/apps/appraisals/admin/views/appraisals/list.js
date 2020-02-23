import { Page } from 'maha-admin'

const mapPropsToPage = (props, context) => ({
  title: 'Appraisals',
  collection: {
    endpoint: '/api/admin/appraisals/appraisals',
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'Supervisor', key: 'supervisor.full_name', primary: true },
      { label: 'Created', key: 'created_at', format: 'date' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'check',
      title: 'No Appraisals',
      text: 'You have not yet created any appraisals'
    },
    entity: 'appraisal',
    onClick: (record) => context.router.history.push(`/admin/appraisals/appraisals/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
