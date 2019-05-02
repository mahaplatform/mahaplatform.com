import { Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const NameToken = ({ asset, name }) => (
  <div className="token">
    { name || asset.original_file_name }
  </div>
)

NameToken.propTypes = {
  asset: PropTypes.object,
  name: PropTypes.string
}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Imports',
  rights: ['team:manage_people'],
  collection: {
    endpoint: '/api/admin/team/imports',
    table: [
      { label: 'Name', key: 'name', primary: true, format: NameToken },
      { label: 'Table', key: 'object_type' },
      { label: 'User', key: 'user.full_name'},
      { label: 'Stage', key: 'stage'}

    ],
    empty: 'There are no imports from your team',
    entity: 'import',
    icon: 'upload',
    link: (record) => `/admin/team/imports/${record.id}`,
    defaultSort: { key: 'created_at', order: 'desc' }
  }
})

export default Page(null, mapPropsToPage)
