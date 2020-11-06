import { Avatar } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import New from '../new'

class Trigger extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    group_id: PropTypes.number,
    user_id: PropTypes.number
  }

  _handleNew = this._handleNew.bind(this)

  render() {
    const { admin } = this.context
    return (
      <div className="news-form-trigger">
        <div className="news-form-trigger-avatar">
          <Avatar user={ admin.user } presence={ false } />
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
    const { group_id } = this.props
    const { user_id } = this.props
    this.context.modal.open(<New group_id={ group_id } user_id={ user_id } />, {
      width: 500,
      height: 500
    })
  }

}


export default Trigger
