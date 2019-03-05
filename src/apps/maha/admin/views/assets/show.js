import { Page, AssetPreview } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Asset = ({ asset }) => (
  <AssetPreview asset={ asset } comments={ true } />
)

Asset.propTypes = {
  asset: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  asset: `/api/admin/assets/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Asset Viewer',
  component: Asset,
  task: {
    icon: 'info-circle',
    route: `/assets/${props.params.id}/info`
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
