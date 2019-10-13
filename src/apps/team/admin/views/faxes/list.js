import { Page, TwilioStatusToken } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Faxes',
  collection: {
    endpoint: '/api/admin/team/faxes',
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Sent/Received', key: 'created_at', primary: true, format: 'datetime' },
      { label: 'Direction', key: 'direction'},
      { label: 'From', key: 'from.formatted', primary: true },
      { label: 'To', key: 'to.formatted', primary: true },
      { label: 'Pages', key: 'num_pages' },
      { label: 'Price', key: 'price' },
      { label: 'Status', key: 'status', primary: true, collapsing: true, format: TwilioStatusToken }
    ],
    empty: 'You have not yet sent or received any faxes',
    entity: 'fax',
    icon: 'fax',
    defaultSort: { key: 'created_at', order: 'desc' }
  }
})

export default Page(null, mapPropsToPage)
