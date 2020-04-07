import { Audit, Button, Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import Embed from './embed'
import React from 'react'

const Details = ({ audits, form }) => {

  const url = {
    label: form.url,
    className: 'link',
    link: form.url
  }

  const embed = {
    label: 'embed code',
    className: 'link',
    modal: {
      component: <Embed form={ form } />,
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
    label: 'Design Workflow',
    className: 'link',
    route: `/admin/crm/workflows/${form.workflow.id}/design`
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
        { form.code } (<Button { ...embed } />)
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
