import { Page, HelpArticleToken } from '@admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'
import New from './new'

const VideoToken = ({ value }) => (
  <span style={{ color:'red' }}>
    { value ?
      <i className="fa fa-video-camera" /> :
      null
    }
  </span>
)

VideoToken.propTypes ={
  value: PropTypes.any
}

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Help Articles',
  collection: {
    endpoint: '/api/admin/platform/articles',
    table: [
      { label: 'ID', key: 'id', collapsing: true, visible: false },
      { label: 'Title', key: 'title', primary: true, format: HelpArticleToken },
      { label: 'App', key: 'app.title' },
      { label: 'Large', key: 'desktop', collapsing: true, align: 'center', format: VideoToken },
      { label: 'Small', key: 'desktop_small', collapsing: true, align: 'center', format: VideoToken },
      { label: 'Mobile', key: 'mobile', collapsing: true, align: 'center', format: VideoToken },
      { label: 'Published', key: 'is_published', collapsing: true, format: 'check_times' }
    ],
    entity: 'asset',
    defaultSort: { key: 'created_at', order: 'desc' },
    onClick: (record) => context.router.history.push(`/platform/help/articles/${record.id}`),
    selectable: true,
    buttons: (selected, onSuccess) => [{
      color: 'red',
      text: 'Publish Selected',
      request: {
        method: 'PATCH',
        endpoint: '/api/admin/platform/articles/publish',
        body: {
          filter: selected.filter,
          is_published: true
        },
        onFailure: (result) => context.flash.set('error', `Unable to publish these ${pluralize('item', selected.total, true)}`),
        onSuccess: (result) => context.flash.set('success', `You successfully published ${pluralize('item', selected.total, true)}`)
      }
    },{
      color: 'red',
      text: 'Unpublish Selected',
      request: {
        method: 'PATCH',
        endpoint: '/api/admin/platform/articles/publish',
        body: {
          filter: selected.filter,
          is_published: false
        },
        onFailure: (result) => context.flash.set('error', `Unable to unpublish these ${pluralize('item', selected.total, true)}`),
        onSuccess: (result) => context.flash.set('success', `You successfully unpublished ${pluralize('item', selected.total, true)}`)
      }
    }]
  },
  task: {
    icon: 'plus',
    modal: New
  }
})

export default Page(null, mapPropsToPage)
