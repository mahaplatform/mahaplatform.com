import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Batches',
  collection: {
    endpoint: '/api/admin/finance/batches',
    table: [
      { label: 'ID', key: 'id', collapsing: true, primary: true },
      { label: 'Exported By', key: 'user.full_name', sort: 'maha_users.last_name', primary: true },
      { label: 'Items', key: 'items_count', collapsing: true, primary: true },
      { label: 'Total', key: 'total', collapsing: true, primary: true, format: 'currency' },
      { label: 'Date', key: 'date', collapsing: true, primary: true, format: 'date' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'copy',
      title: 'No Batches',
      text: 'You have not yet created any batches'
    },
    entity: 'batch',
    onClick: (record) => context.router.history.push(`/admin/finance/reports?$filter[batch_id][$in][0]=${record.id}`),
    recordTasks: (record) => [
      {
        label: 'Download Batch',
        url: `/api/admin/finance/batches/${record.id}.csv?$page[limit]=0&download=true&enclosure="&token=${props.team.token}`
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
