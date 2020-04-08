import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Queues',
  collection: {
    table: [
      { label: 'ID', key: 'id', primary: true, collapsing: true },
      { label: 'Created At', key: 'created_at' },
      { label: 'Attempts', key: 'attempts', collapsing: true, align: 'right' }
    ],
    endpoint: `/api/admin/platform/queues/${page.params.name}/${page.params.status}`,
    entity: 'jobs',
    defaultSort: { key: 'created_at', order: 'asc' },
    onClick: (record) => context.router.history.push(`/admin/platform/queues/${page.params.name}/jobs/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
