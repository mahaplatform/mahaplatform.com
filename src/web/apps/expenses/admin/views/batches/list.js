import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Batches',
  collection: {
    endpoint: '/api/admin/expenses/batches',
    table: [
      { label: 'ID', key: 'id', primary: true, collapsing: true },
      { label: 'Exported By', key: 'user.full_name', sort: 'maha_users.last_name', primary: true },
      { label: 'Items', key: 'items_count', primary: true, collapsing: true },
      { label: 'Total', key: 'total', primary: true, collapsing: true, format: 'currency' },
      { label: 'Date', key: 'date', primary: true, collapsing: true, format: 'date' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'batch',
    icon: 'copy',
    link: (record) => `/admin/expenses/reports?$filter[batch_id][$in][0]=${record.id}`,
    recordTasks: (record) => [
      {
        label: 'Download Batch',
        url: `/api/admin/expenses/batches/${record.id}.csv?download=true&enclosure="&token=${props.team.token}`
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
