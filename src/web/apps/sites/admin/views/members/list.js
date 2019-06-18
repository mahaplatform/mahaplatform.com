import { Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import New from './new'

const NameCell = ({ first_name, last_name, email }) => (
  <div className="token">
    <strong>{ first_name } { last_name}</strong><br />
    { email }
  </div>
)

NameCell.propTypes = {
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  email: PropTypes.string
}

const mapResourcesToPage = (props, context, page) => ({
  fields: `/api/admin/sites_sites/${page.params.site_id}/fields`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Members',
  collection: {
    table: [
      { label: 'Name', key: 'last_name', sort: 'last_name', primary: true, format: NameCell }
    ],
    endpoint: `/api/admin/sites/sites/${page.params.site_id}/members`,
    empty: 'This site does not have any members',
    entity: 'member',
    icon: 'users',
    link: (record) => `/admin/sites/sites/${page.params.site_id}/members/${record.id}`,
    new: () => <New fields={ resources.fields } site_id={ page.params.site_id } />,
    defaultSort: { key: 'created_at', order: 'asc' }
  },
  tasks: {
    icon: 'plus',
    items: [
      { label: 'Add Member', modal: () => <New fields={ resources.fields } site_id={ page.params.site_id } /> }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
