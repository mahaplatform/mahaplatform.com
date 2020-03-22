import PropTypes from 'prop-types'
import Trigger from './trigger'
import Post from '../post'
import React from 'react'

class Posts extends React.PureComponent {

  static propTypes = {
    records: PropTypes.array,
    onNew: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="news-posts">
        <Trigger />
        { records.map((post, index) => (
          <Post { ...this._getPost(post) } key={`post_${post.id}`} />
        )) }
      </div>
    )
  }

  _getPost(post) {
    return {
      ...post
    }
  }

}

export default Posts
