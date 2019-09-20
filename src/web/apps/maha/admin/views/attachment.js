import { Page, AssetPreview } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Asset = ({ attachment }) => (
  <AssetPreview asset={ attachment.asset } comments={ true } />
)

Asset.propTypes = {
  attachment: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  attachment: `/api/admin/${props.params.attachable_type}/${props.params.attachable_id}/attachments/${props.params.id}`
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
