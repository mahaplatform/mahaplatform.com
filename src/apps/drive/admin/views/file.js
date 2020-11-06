import { Page, AssetPreview } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

const File = ({ file }) => <AssetPreview asset={ file.asset } comments={ true } />

File.propTypes = {
  file: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  file: `/api/admin/drive/files/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'File Viewer',
  component: File,
  task: document.body.clientWidth <= 768 ? {
    icon: 'info-circle',
    route: `/admin/drive/files/${props.params.id}/info`
  } : null
})

export default Page(mapResourcesToPage, mapPropsToPage)
