import { Page } from 'maha-admin'
import New from './new'


const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Shortlinks',
  collection: {
    endpoint: '/api/admin/team/shortlinks',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Code', key: 'code', primary: true, collapsing: true },
      { label: 'URL', key: 'url' }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'link',
      title: 'No Links',
      text: 'You have not yet created any short links',
      buttons: [
        { label: 'Create Shortlink', modal: New }
      ]
    },
    entity: 'link',
    onClick: (record) => context.router.history.push(`/admin/team/shortlinks/${record.id}`)
  },
  task: {
    label: 'New Shortlink',
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
