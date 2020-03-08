import { Page, TwilioStatusToken } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Faxes',
  collection: {
    endpoint: '/api/admin/team/faxes',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Sent/Received', key: 'created_at', primary: true, format: 'datetime' },
      { label: 'Direction', key: 'direction'},
      { label: 'From', key: 'from.formatted', primary: true },
      { label: 'To', key: 'to.formatted', primary: true },
      { label: 'Pages', key: 'num_pages' },
      { label: 'Price', key: 'price' },
      { label: 'Status', key: 'status', collpasing: true, primary: true, padded: true, format: TwilioStatusToken }
    ],
    empty: {
      icon: 'fax',
      title: 'No Faxes',
      text: 'You have not yet sent any faxes'
    },
    entity: 'fax',
    defaultSort: { key: 'created_at', order: 'desc' }
  }
})

export default Page(null, mapPropsToPage)
