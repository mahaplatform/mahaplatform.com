import { Page, HelpArticleToken } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Help Articles',
  collection: {
    endpoint: '/api/admin/platform/articles',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: HelpArticleToken },
      { label: 'App', key: 'app.title' }
    ],
    entity: 'asset',
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/admin/platform/help/articles/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
