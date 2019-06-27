import EmailToken from '../../tokens/email_token'
import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Emails',
  collection: {
    table: [
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
