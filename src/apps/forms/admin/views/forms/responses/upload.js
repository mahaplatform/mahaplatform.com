import { AssetPreview, Page } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const Upload = ({ upload }) => (
  <AssetPreview asset={ upload } comments={ true } />
)

Upload.propTypes = {
  upload: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  upload: `/api/admin/forms/forms/${props.params.form_id}/responses/${props.params.response_id}/uploads/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Upload',
  component: Upload
})

export default Page(mapResourcesToPage, mapPropsToPage)
