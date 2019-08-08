import EmailToken from '../../tokens/email'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Emails',
  collection: {
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Name', key: 'code', sort: 'code', primary: true, format: EmailToken }
    ],
    endpoint: `/api/admin/sites/sites/${page.params.site_id}/emails`,
    empty: 'This site does not have any emails',
    entity: 'email',
    icon: 'envelope',
    defaultSort: { key: 'code', order: 'asc' }
  }
})

export default Page(null, mapPropsToPage)
