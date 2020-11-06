import GalleryList from '../components/gallery_list'
import { Page } from '@admin'
import React from 'react'

const mapResourcesToPage = (props, context) => ({
  attachments: `/api/admin/${props.params.attachable_type}/${props.params.attachable_id}/attachments`
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Gallery',
  component: () => <GalleryList attachable_type={ props.params.attachable_type } attachable_id={ props.params.attachable_id } attachments={ resources.attachments } />
})

export default Page(mapResourcesToPage, mapPropsToPage)
