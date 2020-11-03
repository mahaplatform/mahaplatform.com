import { Audit, Button, Comments, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, form }) => {

  const design = {
    label: 'Design Form',
    className: 'link',
    route: `/admin/crm/forms/${form.id}/design`
  }

  const link = {
    label: 'View Public Form',
    className: 'link',
    link: form.url
  }

  const workflow = {
    label: 'Manage Workflow',
    className: 'link',
    route: `/admin/automation/workflows/${form.workflow.id}`
  }

  const list = {}

  if(form.deleted_at !== null) {
    list.alert = { color: 'red', message: 'This form was deleted' }
  }

  list.items = [
    { label: 'Title', content: form.title },
    { label: 'Program', content: form.program.title },
    { label: 'Code', content: form.code },
    { label: 'Content', content: <Button { ...design } /> },
    { label: 'URL', content: <Button { ...link } /> },
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
