import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Responses',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/forms/${props.params.form_id}/responses`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      { label: 'Contact', key: 'contact.full_name', primary: true }
    ],
    empty: {
      icon: 'user',
      title: 'No Responses',
      text: 'There are no responses to this form'
    },
    defaultSort: { key: 'created_at', order: 'asc' },
    entity: 'responses',
    onClick: (record) => context.router.history.push(`/admin/crm/forms/${props.params.form_id}/responses/${record.id}`)
  }
})

export default Page(null, mapPropsToPage)
