import { Button, List } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ form }) => {

  const design = {
    label: 'Design Form',
    className: 'link',
    route: `/admin/crm/forms/${form.id}/design`
  }

  const responses = {
    label: `${form.responses} responses`,
    className: 'link',
    route: `/admin/crm/forms/${form.id}/responses`
  }

  const url = {
    label: 'Public Form',
    className: 'link',
    href: `${process.env.WEB_HOST}/forms/${form.code}`
  }

  const embed = {
    label: 'Embed Code',
    className: 'link',
    href: `${process.env.WEB_HOST}/forms/${form.code}`
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
    { label: 'View', content: (
      <div>
        <Button { ...url } /> | <Button { ...embed } />
      </div>
    ) },
    { label: 'Responses', content: <Button { ...responses } /> }

  ]

  return <List { ...list } />

}

Details.propTypes = {
  form: PropTypes.object
}

export default Details
