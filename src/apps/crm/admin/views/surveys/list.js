import { Page } from 'maha-admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Surveys',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/programs',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true }, 
      { label: 'Phone Number', key: 'phone_number.formatted' }
    ],
    empty: {
      icon: 'sitemap',
      title: 'No Programs',
      text: 'You have not yet created any programs',
      buttons: [
        { label: 'Create Program', modal: New }
      ]
    },
    entity: 'program',
    defaultSort: { key: 'title', order: 'asc' },
    onClick: (record) => context.router.history.push(`/admin/crm/programs/${record.id}`)
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Add Qualtrics Account',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
