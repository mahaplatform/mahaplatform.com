import { Page, AssetPreview } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Asset = ({ asset }) => (
  <AssetPreview asset={ asset } comments={ true } />
)

Asset.propTypes = {
  asset: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  asset: `/api/admin/platform/assets/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Asset Viewer',
  component: Asset
})

export default Page(mapResourcesToPage, mapPropsToPage)
