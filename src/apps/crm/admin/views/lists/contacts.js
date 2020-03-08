import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Contacts',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/lists/${props.params.id}/contacts`,
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Contact', key: 'contact.full_name', primary: true }
    ],
    empty: {
      icon: 'user',
      title: 'No Subscriptions',
      text: 'There are no contacts subscribed to this list'
    },
    defaultSort: { key: 'created_at', order: 'asc' },
    entity: 'contact',
    onClick: (record) => context.router.history.push(`/admin/crm/contacts/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
