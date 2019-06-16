import { List, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ title }) => {

  const list = {
    sections: [
      {
        items: [
          { label: 'Title', content: title }
        ]
      }
    ]
  }

  return <List { ...list } />

}

Details.propTypes = {
  title: PropTypes.string
}

const mapResourcesToPage = (props, context, page) => ({
  item: `/api/admin/sites/sites/${page.params.site_id}/types/${page.params.type_id}/items/${page.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Item',
  rights: [],
  tabs: {
    items: [
      { label: 'Details', component: <Details { ...resources.item } /> }
    ]
  },
  tasks: {
    items: [
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
