import { AssetPreview, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Receipt = ({ receipt }) => (
  <AssetPreview asset={ receipt } comments={ true } />
)

Receipt.propTypes = {
  receipt: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  receipt: `/api/admin/finance/receipts/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Receipt',
  component: Receipt
})

export default Page(mapResourcesToPage, mapPropsToPage)
