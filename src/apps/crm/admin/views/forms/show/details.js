import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ form }) => {

  const design = {
    label: 'edit design',
    className: 'link',
    route: `/admin/crm/forms/${form.code}/design`
  }

  const responses = {
    label: '256 responses',
    className: 'link',
    route: `/admin/crm/forms/${form.code}/responses`
  }

  const list = {}

  if(form.status === 'draft') {
    list.alert = { color: 'grey', message: 'This workflow is in draft mode' }
  } else if(form.status === 'active') {
    list.alert = { color: 'green', message: 'This workflow is active' }
  } else if(form.status === 'inactive') {
    list.alert = { color: 'red', message: 'This workflow is inactive' }
  }

  list.items = [
    { label: 'Title', content: form.title },
    { label: 'Design', content: <Button { ...design } /> },
    { label: 'Responses', content: <Button { ...responses } /> }

  ]

  return <List { ...list } />

}

Details.propTypes = {
  form: PropTypes.object
}

export default Details
