import { Page, AssetInfo } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Asset = ({ asset }) => (
  <AssetInfo asset={ asset } />
)

Asset.propTypes = {
  asset: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  asset: `/api/admin/assets/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Asset Info',
  component: Asset
})

export default Page(mapResourcesToPage, mapPropsToPage)
