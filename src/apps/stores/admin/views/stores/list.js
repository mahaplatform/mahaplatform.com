import StoreForm from '../../components/storeform'
import StoreToken from '../../tokens/store'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Stores',
  collection: {
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: StoreToken },
      { label: 'Program', key: 'program.title', sort: 'program'}
    ],
    empty: {
      icon: 'building-o',
      title: 'No Stores',
      text: 'You have not yet created any stores',
      buttons: [
        { label: 'Create Store', modal: StoreForm }
      ]
    },
    endpoint: '/api/admin/stores/stores',
    entity: 'store',
    defaultSort: { key: 'title', order: 'asc' },
    onClick: (record) => context.router.history.push(`/admin/stores/stores/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: StoreForm
  }
})

export default Page(null, mapPropsToPage)
