import { Fields, List, Page } from 'maha-admin'
import NewType from '../types/new'
import PropTypes from 'prop-types'
import React from 'react'

const Details = ({ title }) => {

  const list = {
    sections: [
      {
        items: [
          { label: 'Title', content: title },
          { label: 'Description', content: title }
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
  types: `/api/admin/sites/sites/${page.params.site_id}/types`,
  type: `/api/admin/sites/sites/${page.params.site_id}/types/${page.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.type.title,
  tabs: {
    items: [
      { label: 'Details', component: <Details { ...resources.type } /> },
      { label: 'Fields', component: <Fields parent_type="sites_types" parent_id={ page.params.id } datasources={ resources.types.map(type => ({
        label: type.title,
        endpoint: `/api/admin/sites/sites/${page.params.site_id}/types/${type.id}/items`,
        value: 'id',
        text: 'title',
        type_id: type.id
      })) } /> }
    ]
  },
  tasks: {
    items: [
      {
        label: 'Edit Type',
        modal: () => <NewType site_id={ page.params.site_id } id={ page.params.id } />
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
