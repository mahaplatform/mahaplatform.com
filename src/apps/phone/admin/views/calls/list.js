import FromToken from '@apps/phone/admin/tokens/caller/from'
import ToToken from '@apps/phone/admin/tokens/caller/to'
import { Page, TwilioStatusToken } from '@admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Call Logs',
  collection: {
    endpoint: '/api/admin/phone/calls',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'From', key: 'from_number.formatted', primary: true, format: FromToken },
      { label: 'To', key: 'to_number.formatted', primary: true, format: ToToken },
      { label: 'Date', key: 'created_at', primary: true, format: 'datetime' },
      { label: 'Status', key: 'status', collapsing: true, primary: true, padded: true, format: TwilioStatusToken }
    ],
    defaultSort: { key: 'created_at', order: 'desc' },
    empty: {
      icon: 'phone',
      title: 'No Calls',
      text: 'You have not yet sent or received any calls'
    },
    entity: 'call',
    onClick: (record) => context.router.history.push(`/team/calls/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
