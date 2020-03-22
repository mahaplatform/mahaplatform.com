import { Avatar } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import New from '../new'

class Posts extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {}

  _handleNew = this._handleNew.bind(this)

  render() {
    const { admin } = this.context
    return (
      <div className="news-form-trigger">
        <div className="news-form-trigger-avatar">
          <Avatar user={ admin.user } />
        </div>
        <div className="news-form-trigger-label">
          <div className="news-form-trigger-placeholder" onClick={ this._handleNew }>
            Whats on your mind?
          </div>
        </div>
      </div>
    )
  }

  _handleNew() {
    this.context.modal.open(<New />, {
      width: 500,
      height: 500
    })
  }

}

export default Posts
