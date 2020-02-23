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
    endpoint: `/api/admin/sites/sites/${page.params.site_id}/members`,
    table: [
      { label: 'ID', key: 'id', width: 80, visible: false },
      { label: 'Name', key: 'last_name', sort: 'last_name', primary: true, format: NameCell }
    ],
    empty: {
      icon: 'users',
      title: 'No Members',
      text: 'This site does not have any members',
      buttons: [
        { label: 'Create Member', modal: <New fields={ resources.fields } site_id={ page.params.site_id } /> }
      ]
    },
    entity: 'member',
    defaultSort: { key: 'created_at', order: 'asc' },
    onClick: (record) => context.router.history.push(`/admin/sites/sites/${page.params.site_id}/members/${record.id}`)
  },
  task: {
    icon: 'plus',
    modal: <New fields={ resources.fields } site_id={ page.params.site_id } />
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
