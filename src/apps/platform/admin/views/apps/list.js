import { AppToken, Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Apps',
  collection: {
    endpoint: '/api/admin/platform/apps',
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'App', key: 'code', primary: true, format: AppToken }
    ],
    entity: 'asset',
    defaultSort: { key: 'code', order: 'asc' },
    onClick: (record) => context.router.history.push(`/admin/platform/apps/${record.code}`)
  }
})

export default Page(null, mapPropsToPage)
