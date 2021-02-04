import NumberToken from '@apps/phone/admin/tokens/number'
import { Page } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Phone Numbers',
  rights: [],
  collection: {
    endpoint: '/api/admin/phone/phone_numbers',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Number', key: 'formatted', primary: true, format: NumberToken },
      { label: 'Program', key: 'program.title', primary: true }
    ],
    empty: {
      icon: 'hashtag',
      title: 'No Phone Numbers',
      text: 'You have not yet created any phone numbers'
    },
    entity: 'phone number',
    defaultSort: { key: 'number', order: 'asc' },
    onClick: (record) => context.router.history.push(`/phone/phone_numbers/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
