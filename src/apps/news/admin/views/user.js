import Feed from '../components/feed'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

const WrappedFeed = ({ user }) => (
  <Feed user_id={ user.id } />
)

WrappedFeed.propTypes = {
  user: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  user: `/api/admin/users/${props.params.id}`
})

const mapPropsToPage = (props, context, resources, page) => ({
  title: resources.user.title,
  component: WrappedFeed
})

export default Page(mapResourcesToPage, mapPropsToPage)
