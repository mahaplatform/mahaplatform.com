import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Batches',
  collection: {
    endpoint: '/api/admin/finance/batches',
    table: [
      { label: 'ID', key: 'id', collapsing: true, primary: true },
      { label: 'Exported By', key: 'user.full_name', sort: 'user', primary: true },
      { label: 'Type', key: 'type', collapsing: true },
      { label: 'Items', key: 'items_count', collapsing: true, align: 'right' },
      { label: 'Total', key: 'total', collapsing: true, format: 'currency' },
      { label: 'Date', key: 'date', collapsing: true, primary: true, format: 'date' }
    ],
    filters: [
      { label: 'Type', name: 'type', type: 'select', multiple: true, options: [{ value: 'disbursement', text: 'Disbursement' },{ value: 'expense', text: 'Expense' }] }
    ],
    defaultSort: { key: 'date', order: 'desc' },
    empty: {
      icon: 'copy',
      title: 'No Batches',
      text: 'You have not yet created any batches'
    },
    entity: 'batch',
    onClick: (record) => {
      if(record.type === 'expense') context.router.history.push(`/admin/finance/reports?$filter[batch_id][$in][0]=${record.id}`)
      if(record.type === 'revenue') context.router.history.push(`/admin/finance/reports/revenue?$filter[batch_id][$in][0]=${record.id}`)
    },
    recordTasks: (record) => [
      {
        label: 'Download Batch',
        url: `/api/admin/finance/batches/${record.type}/${record.id}.csv?$page[limit]=0&download=true&enclosure="&token=${props.team.token}`
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
