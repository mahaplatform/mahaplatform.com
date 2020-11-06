import Performance from './performance'
import { Embed, Page } from '@admin'
import Details from './details'
import Edit from '../edit'
import React from 'react'

const getTabs = ({ audits, form, workflows }) => ({
  items: [
    { label: 'Details', component: <Details form={ form } audits={ audits } /> },
    { label: 'Performance', component: <Performance form={ form } /> }
  ]
})

const getTasks = ({ form }) => {

  const embed = {
    title: 'Embed Code',
    header: (
      <p>You can embed this form within your website by pasting this
      code into your html.</p>
    ),
    code: `<div data-form="${form.code}"></div>
<script src="${process.env.WEB_HOST}/maha.js"></script>
<script>
new Maha.Forms.Form({
  code: '${form.code}'
})
</script>`
  }

  const items = []
  if(!form.deleted_at) {
    items.push({ label: 'Edit Form', modal: <Edit form={ form } /> })
    items.push({
      label: 'Get Embed Code',
      modal: {
        component: <Embed { ...embed } />,
        options: {
          width: 640,
          height: 480
        }
      }
    })
    items.push({
      label: 'Delete Form',
      confirm: `
        Are you sure you want to delete this form? You will also delete all of
        the associated workflows, emails, and performance data
      `,
      request: {
        endpoint: `/api/admin/forms/forms/${form.id}`,
        method: 'delete'
      }
    })
  }
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/crm_forms/${props.params.id}/audits`,
  form: `/api/admin/forms/forms/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Form',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
