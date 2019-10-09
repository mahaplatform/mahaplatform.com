import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Campaigns',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/campaigns/email/${props.params.id}/deliveries`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Contact', key: 'contact.display_name', primary: true }
    ],
    empty: 'This email campaign has not yet been sent',
    entity: 'email',
    icon: 'envelope',
    defaultSort: { key: 'created_at', order: 'desc' }
  }
})

export default Page(null, mapPropsToPage)
