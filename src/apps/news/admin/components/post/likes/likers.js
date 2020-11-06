import { UserToken, Infinite, ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class Likes extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    post_id: PropTypes.number
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Infinite { ...this._getInfinite() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Likes',
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _getInfinite() {
    const { post_id } = this.props
    return {
      endpoint: `/api/admin/news/posts/${post_id}/likes`,
      empty: 'There are no likes',
      layout: ({ records }) => (
        <div className="news-post-likers-panel">
          { records.map((like, index) => (
            <div className="news-post-liker" key={ `like_${index}` }>
              <UserToken { ...like.user} />
            </div>
          )) }
        </div>
      )
    }

  }

  _handleDone() {
    this.context.modal.close()
  }

}

export default Likes
