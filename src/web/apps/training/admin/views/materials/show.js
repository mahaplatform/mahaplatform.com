import { AssetPreview, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Material = ({ material }) => (
  <AssetPreview asset={ material.asset } comments={ true } />
)

Material.propTypes = {
  material: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  material: `/api/admin/training/trainings/${props.params.training_id}/materials/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Material',
  component: Material
})

export default Page(mapResourcesToPage, mapPropsToPage)
