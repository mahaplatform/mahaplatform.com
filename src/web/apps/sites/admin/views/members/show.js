import { List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ full_name, email }) => {

  const list = {
    sections: [
      {
        items: [
          { label: 'Name', content: full_name },
          { label: 'Email', content: email }
        ]
      }
    ]
  }
  return <List { ...list } />

}

Details.propTypes = {
  full_name: PropTypes.string,
  email: PropTypes.string
}

const mapResourcesToPage = (props, context, page) => ({
  member: `/api/admin/sites/sites/${page.params.site_id}/members/${page.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Member',
  rights: [],
  tabs: {
    items: [
      { label: 'Details', component: <Details { ...resources.member } /> }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
