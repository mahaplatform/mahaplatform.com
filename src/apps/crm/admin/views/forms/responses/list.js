import { Page } from 'maha-admin'

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Responses',
  rights: [],
  collection: {
    endpoint: `/api/admin/crm/forms/${props.params.form_id}/responses`,
    table: [
      { label: 'ID', key: 'id', visible: false, collapsing: true },
      ...resources.form.config.fields.map(field => (
        { label: field.label, key: `data.${field.name}`, sort: field.name }
      )),
      { label: 'Created At', key: 'created_at', format: 'datetime' }
    ],
    empty: {
      icon: 'user',
      title: 'No Responses',
      text: 'There are no responses to this form'
    },
    defaultSort: { key: 'created_at', order: 'desc' },
    entity: 'responses',
    onClick: (record) => context.router.history.push(`/admin/crm/forms/${props.params.form_id}/responses/${record.id}`)
  }
})

const mapResourcesToPage = (props, context) => ({
  form: `/api/admin/crm/forms/${props.params.form_id}`
})

export default Page(mapResourcesToPage, mapPropsToPage)
