import { AssetPreview, Page } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const Fax = ({ fax }) => (
  <AssetPreview asset={ fax.asset } />
)

Fax.propTypes = {
  fax: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  fax: `/api/admin/team/faxes/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Fax',
  component: Fax
})

export default Page(mapResourcesToPage, mapPropsToPage)
