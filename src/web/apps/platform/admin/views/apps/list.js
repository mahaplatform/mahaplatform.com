import { AppToken, Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Apps',
  collection: {
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'App', key: 'code', primary: true, format: AppToken }
    ],
    endpoint: '/api/admin/platform/apps',
    entity: 'asset',
    link: (record) => `/admin/platform/apps/${record.code}`,
    defaultSort: { key: 'code', order: 'asc' }
  }
})

export default Page(null, mapPropsToPage)
