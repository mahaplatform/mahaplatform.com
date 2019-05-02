import GalleryList from '../components/gallery_list'
import { Page } from 'maha-admin'
import React from 'react'

const mapResourcesToPage = (props, context) => ({
  attachments: `/api/admin/attachments/${props.params.attachable_type}/${props.params.attachable_id}`
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Gallery',
  component: () => <GalleryList attachments={ resources.attachments } />
})

export default Page(mapResourcesToPage, mapPropsToPage)
