import { Page, AssetInfo } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Asset = ({ file }) => (
  <AssetInfo asset={ file.asset } />
)

Asset.propTypes = {
  file: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  file: `/api/admin/drive/files/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Asset Info',
  component: Asset
})

export default Page(mapResourcesToPage, mapPropsToPage)
