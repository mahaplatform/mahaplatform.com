import { Page, AssetPreview } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const File = ({ file, page }) => {
  const id = parseInt(page.params.id)
  const version = file.versions.find(version => {
    return version.id === id
  })
  return <AssetPreview asset={ version.asset } comments={ true } />
}

File.propTypes = {
  file: PropTypes.object,
  page: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  file: `/api/admin/drive/files/${props.params.file_id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'File Viewer',
  component: File
})

export default Page(mapResourcesToPage, mapPropsToPage)
