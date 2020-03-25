import Post from '../components/post'
import PropTypes from 'prop-types'
import { Page } from 'maha-admin'
import React from 'react'

const WrappedPost = ({ post }) => (
  <div className="news-post-wrapper">
    <Post { ...post } />
  </div>
)

WrappedPost.propTypes = {
  post: PropTypes.object
}

const mapResourcesToPage = (props, context) => ({
  post: `/api/admin/news/posts/${props.params.id}`
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Post',
  component: WrappedPost
})

export default Page(mapResourcesToPage, mapPropsToPage)
