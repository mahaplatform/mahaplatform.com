import Feed from '../components/feed'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

const WrappedFeed = ({ group }) => (
  <Feed group_id={ group.id } />
)

WrappedFeed.propTypes = {
  group: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  group: `/api/admin/news/groups/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.group.title,
  component: WrappedFeed
})

export default Page(mapResourcesToPage, mapPropsToPage)
