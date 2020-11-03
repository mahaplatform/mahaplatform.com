import { Page } from 'maha-admin'
import Details from './details'
import Edit from './edit'
import React from 'react'

const getTabs = ({ audits, article }) => ({
  items: [
    { label: 'Details', component: <Details article={ article } audits={ audits } /> }
  ]
})

const getTasks = ({ article }) => {
  const items = [
    { label: 'Edit Help Article', modal: <Edit article={ article } /> },
    {
      label: 'Publish Article',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/platform/articles/${article.id}/publish`,
        body: {
          is_published: true
        }
      }
    },
    {
      label: 'Unpublish Article',
      request: {
        method: 'PATCH',
        endpoint: `/api/admin/platform/articles/${article.id}/publish`,
        body: {
          is_published: false
        }
      }
    }
  ]
  return { items }
}

const mapResourcesToPage = (props, context) => ({
  audits: `/api/admin/maha_help_articles/${props.params.id}/audits`,
  article: `/api/admin/platform/articles/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Help Article',
  tabs: getTabs(resources, context),
  tasks: getTasks(resources, context)
})

export default Page(mapResourcesToPage, mapPropsToPage)
