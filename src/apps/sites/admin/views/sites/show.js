import { List, Page } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import Edit from './edit'

const Details = ({ title, origins }) => {

  const list = {
    sections: [
      {
        items: [
          { label: 'Title', content: title },
          { label: 'Origins', content: <span>{ origins.split('\n').map((origin, index) => (
            <span key={`origin_${index}`}>{ origin }<br /></span>
          )) }</span> }
        ]
      }
    ]
  }

  return <List { ...list } />

}

Details.propTypes = {
  origins: PropTypes.string,
  title: PropTypes.string
}

const mapResourcesToPage = (props, context, page) => ({
  site: `/api/admin/sites/sites/${page.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: 'Site',
  tabs: {
    items: [
      { label: 'Details', component: <Details { ...resources.site } /> }
    ]
  },
  tasks: {
    items: [
      {
        label: 'Edit Site',
        modal: () => <Edit site_id={ page.params.id } />
      }, {
        label: 'Reindex Site',
        request: {
          method: 'PATCH',
          endpoint: `/api/admin/sites/sites/${ page.params.id }/reindex`,
          onFailure: (result) => context.flash.set('error', 'Unable to reindex the site'),
          onSuccess: (result) => context.flash.set('success', 'Successfully reindexed the site')
        }
      }, {
        label: 'Backup Data',
        handler: () => {
          window.location.href = `/api/admin/sites/sites/${ page.params.id }/backup?token=${props.team.token}`
        }
      }
    ]
  }
})

export default Page(mapResourcesToPage, mapPropsToPage)
