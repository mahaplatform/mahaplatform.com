import { Audit, Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ audits, form }) => {

  const design = {
    label: 'Design Form',
    className: 'link',
    route: `/admin/crm/forms/${form.id}/design`
  }

  const responses = {
    label: `${form.num_responses} responses`,
    className: 'link',
    route: `/admin/crm/forms/${form.id}/responses`
  }


  const confirmation = {
    label: 'Design Email',
    className: 'link',
    route: `/admin/crm/emails/${form.email.id}/design`
  }

  const list = {}

  if(form.status === 'draft') {
    list.alert = { color: 'grey', message: 'This form is in draft mode' }
  } else if(form.status === 'active') {
    list.alert = { color: 'green', message: 'This form is active' }
  } else if(form.status === 'inactive') {
    list.alert = { color: 'red', message: 'This form is inactive' }
  }

  list.items = [
    { label: 'Title', content: form.title },
    { label: 'Design', content: <Button { ...design } /> },
    { label: 'Confirmation', content: <Button { ...confirmation } /> },
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
