import { Audit, Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

const Details = ({ audits, form }) => {

  const design = {
    label: 'Design Form',
    className: 'link',
    route: `/admin/crm/forms/${form.id}/design`
  }

  const responses = {
    label: pluralize('response', form.responses_count, true),
    className: 'link',
    route: `/admin/crm/forms/${form.id}/responses`
  }

  const confirmation = {
    label: 'Design Email',
    className: 'link',
    route: `/admin/crm/forms/${form.id}/email`
  }

  const workflow = {
    label: 'Design Workflow',
    className: 'link',
    route: `/admin/crm/forms/${form.id}/workflow`
  }

  const list = {}

  list.items = [
    { label: 'Title', content: form.title },
    { label: 'Program', content: form.program.title },
    { label: 'Design', content: <Button { ...design } /> },
    { label: 'Confirmation', content: <Button { ...confirmation } /> },
    { label: 'Workflow', content: <Button { ...workflow } /> },
    { label: 'Responses', content: <Button { ...responses } /> },
    { component: <Audit entries={ audits } /> }
  ]

  return <List { ...list } />

}

Details.propTypes = {
  audits: PropTypes.array,
  form: PropTypes.object
}

export default Details
