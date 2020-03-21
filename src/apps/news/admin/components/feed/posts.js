import PropTypes from 'prop-types'
import Post from '../post'
import Form from '../form'
import React from 'react'

class Posts extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    records: PropTypes.array
  }

  static defaultProps = {}

  render() {
    const { records } = this.props
    return (
      <div className="news-posts">
        <Form />
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
