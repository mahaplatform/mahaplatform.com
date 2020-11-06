import { AppToken, Page } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Apps',
  rights: ['team:manage_apps'],
  collection: {
    endpoint: '/api/admin/team/apps',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'App', key: 'code', primary: true, format: AppToken }
    ],
    defaultSort: { key: 'code', order: 'asc' },
    entity: 'app',
    onClick: (record) => context.router.history.push(`/team/apps${record.path}/${record.id}`)
  }
})
export default Page(null, mapPropsToPage)
