import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Likers from './likers'
import React from 'react'
import _ from 'lodash'

class Likes extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    post_id: PropTypes.array,
    liker_ids: PropTypes.array
  }

  state = {
    liker_ids: 0
  }

  _handleClick = this._handleClick.bind(this)
  _handleLikers = this._handleLikers.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { liker_ids } = this.state
    return (
      <div className="news-post-likes">
        <i className={`fa fa-${this._getLikeIcon()}`} onClick={ this._handleClick } />
        { liker_ids.length > 0 ?
          <span className="news-post-likers" onClick={ this._handleLikers }>
            { pluralize('like', liker_ids.length, true) }
          </span> :
          <span>Like</span>
        }
      </div>
    )
  }

  componentDidMount() {
    const { liker_ids } = this.props
    this.setState({ liker_ids })
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getLikeIcon() {
    return this._getUserLikes() ? 'heart' : 'heart-o'
  }

  _getUserLikes() {
    const { liker_ids } = this.state
    const { user } = this.context.admin
    return _.includes(liker_ids, user.id)
  }

  _handleClick() {
    if(this._getUserLikes()) {
      return this._handleUnlike()
    }
    this._handleLike()
  }

  _handleJoin() {
    const { network } = this.context
    const { post_id } = this.props
    const target = `/admin/news/posts/${post_id}/likes`
    network.join(target)
    network.subscribe([
      { target, action: 'update', handler: this._handleUpdate }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { post_id } = this.props
    const target = `/admin/news/posts/${post_id}/likes`
    network.leave(target)
    network.unsubscribe([
      { target, action: 'update', handler: this._handleUpdate }
    ])
  }

  _handleLike() {
    const { post_id } = this.props
    this.context.network.request({
      endpoint: `/api/admin/news/posts/${post_id}/likes`,
      method: 'POST'
    })
  }

  _handleLikers() {
    const { post_id } = this.props
    this.context.modal.push(<Likers post_id={ post_id } />)
  }

  _handleUnlike() {
    const { post_id } = this.props
    this.context.network.request({
      endpoint: `/api/admin/news/posts/${post_id}/likes`,
      method: 'DELETE'
    })
  }

  _handleUpdate({ liker_ids }) {
    this.setState({ liker_ids })
  }

}

export default Likes
