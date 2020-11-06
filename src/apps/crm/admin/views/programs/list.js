import ProgramToken from '../../tokens/program'
import { Page } from '@admin'
import New from './new'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Programs',
  rights: [],
  collection: {
    endpoint: '/api/admin/crm/programs',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: ProgramToken },
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
    onClick: (record) => context.router.history.push(`/crm/programs/${record.id}`)
  },
  tasks: {
    icon: 'plus',
    items: [
      {
        label: 'Add Program',
        modal: New
      }
    ]
  }
})

export default Page(null, mapPropsToPage)
