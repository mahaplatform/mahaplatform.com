import EmailToken from '../../tokens/email'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Emails',
  collection: {
    endpoint: `/api/admin/sites/sites/${page.params.site_id}/emails`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Name', key: 'code', sort: 'code', primary: true, format: EmailToken }
    ],
    defaultSort: { key: 'code', order: 'asc' },
    empty: {
      icon: 'cube',
      title: 'No Emails',
      text: 'You have not yet created any emails'
    },
    entity: 'email'
  }
})

export default Page(null, mapPropsToPage)
