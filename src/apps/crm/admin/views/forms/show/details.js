import { Audit, Button, Comments, Embed, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, form }) => {

  const url = {
    label: form.url,
    className: 'link',
    link: form.url
  }

  const embed = {
    title: 'Embed Code',
    header: (
      <p>You can embed this form within your website by pasting this
      code into your html.</p>
    ),
    code: `<div data-form="${form.code}" />
<script src="${process.env.WEB_HOST}/crm/forms/embed.js"></script>
<script>
new MahaForm({
  code: '${form.code}'
})
</script>`
  }

  const embedEvent = {
    label: 'embed code',
    className: 'link',
    modal: {
      component: <Embed { ...embed } />,
      options: {
        width: 640,
        height: 480
      }
    }
  }

  const design = {
    label: 'Design Form',
    className: 'link',
    route: `/admin/crm/forms/${form.id}/design`
  }

  const email = {
    label: 'Design Email',
    className: 'link',
    route: `/admin/crm/emails/${form.email.id}/design`
  }

  const workflow = {
    label: 'Manage Workflow',
    className: 'link',
    route: `/admin/crm/workflows/${form.workflow.id}`
  }

  const list = {}

  if(form.deleted_at !== null) {
    list.alert = { color: 'red', message: 'This form was deleted' }
  }

  list.items = [
    { label: 'Title', content: form.title },
    { label: 'Program', content: form.program.title },
    { label: 'URL', content: <Button { ...url } /> },
    { label: 'Code', content: (
      <div>
        { form.code } (<Button { ...embedEvent } />)
      </div>
    ) },
    { label: 'Design', content: <Button { ...design } /> },
    { label: 'Confirmation', content: <Button { ...email } /> },
    { label: 'Workflow', content: <Button { ...workflow } /> },
    { component: <Audit entries={ audits } /> }
  ]

  list.footer = <Comments entity={`crm_forms/${form.id}`} active={ form.deleted_at === null } />

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  form: PropTypes.object
}

export default Details
