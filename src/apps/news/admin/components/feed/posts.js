import PropTypes from 'prop-types'
import Trigger from './trigger'
import Post from '../post'
import React from 'react'

class Posts extends React.PureComponent {

  static propTypes = {
    group_id: PropTypes.number,
    records: PropTypes.array,
    user_id: PropTypes.number,
    onNew: PropTypes.array
  }

  render() {
    const { group_id, records, user_id } = this.props
    return (
      <div className="news-posts">
        <Trigger group_id={ group_id } user_id={ user_id } />
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
