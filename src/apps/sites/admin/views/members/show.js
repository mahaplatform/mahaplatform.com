import { List, Page } from 'maha-admin'
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
