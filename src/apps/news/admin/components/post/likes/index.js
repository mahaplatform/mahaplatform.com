import * as selectors from './selectors'
import { connect } from 'react-redux'
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
    post_id: PropTypes.number,
    liker_ids: PropTypes.array
  }

  state = {
    liker_ids: 0
  }

  _handleClick = _.throttle(this._handleClick.bind(this), 250)
  _handleLikers = this._handleLikers.bind(this)

  render() {
    const { liker_ids } = this.props
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

  _getLikeIcon() {
    return this._getUserLikes() ? 'heart' : 'heart-o'
  }

  _getUserLikes() {
    const { user } = this.context.admin
    const { liker_ids } = this.props
    return _.includes(liker_ids, user.id)
  }

  _handleClick() {
    if(this._getUserLikes()) {
      return this._handleUnlike()
    }
    this._handleLike()
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
    this.context.modal.open(<Likers post_id={ post_id } />, {
      width: 550,
      height: 450
    })
  }

  _handleUnlike() {
    const { post_id } = this.props
    this.context.network.request({
      endpoint: `/api/admin/news/posts/${post_id}/likes`,
      method: 'DELETE'
    })
  }

}

const mapStateToProps = (state, props) => ({
  liker_ids: selectors.liker_ids(state, props)
})

export default connect(mapStateToProps)(Likes)
