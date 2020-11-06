import { files, images, media } from './selectors'
import Reactions from '../../reactions/reactions'
import Reaction from '../../reactions/reaction'
import AssetToken from '../../../tokens/asset'
import AssetViewer from '../../asset/viewer'
import QuotedComment from './quoted_comment'
import Attachment from '../../attachment'
import Timestamp from '../../timestamp'
import RichText from '../../richtext'
import { connect } from 'react-redux'
import Gallery from '../../gallery'
import PropTypes from 'prop-types'
import Avatar from '../../avatar'
import Link from '../../link'
import React from 'react'

class Comment extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    confirm: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.array,
    created_at: PropTypes.string,
    entity: PropTypes.string,
    files: PropTypes.array,
    id: PropTypes.number,
    images: PropTypes.array,
    link: PropTypes.object,
    media: PropTypes.array,
    quoted_comment: PropTypes.object,
    reactions: PropTypes.array,
    text: PropTypes.string,
    uid: PropTypes.string,
    updated_at: PropTypes.string,
    user: PropTypes.object,
    onQuoteComment: PropTypes.func
  }

  state = {
    show: false
  }

  _handleDestroyComment = this._handleDestroyComment.bind(this)
  _handleHideActions = this._handleHideActions.bind(this)
  _handleQuoteComment = this._handleQuoteComment.bind(this)
  _handleShowActions = this._handleShowActions.bind(this)

  render() {
    const { created_at, files, images, link, media, quoted_comment, user } = this.props
    const { show } = this.state
    return (
      <div { ...this._getMessage() }>
        <div className="maha-message-avatar">
          <Avatar user={ user } />
        </div>
        <div className="maha-message-content">
          <div className="maha-message-author">
            <div className="maha-message-name">{ user.full_name }</div>
            <div className="maha-message-timestamp">
              <Timestamp time={ created_at } />
            </div>
          </div>
          <div className="maha-message-extras">
            { quoted_comment && <QuotedComment comment={ quoted_comment } /> }
            <div className="maha-message-text">
              <RichText { ...this._getRichtext() } />
            </div>
            { link && <Link link={ link } /> }
            { images.length > 0 && <Gallery { ...this._getGallery() } /> }
            { media.length > 0 &&
              <div className="maha-medias">
                { media.map((video, index) => (
                  <div className="maha-media" key={`video_${index}`} onClick={ this._handleClick.bind(this, video.asset) }>
                    <AssetViewer asset={ video.asset } />
                    <AssetToken { ...video.asset } />
                  </div>
                ))}
              </div>
            }
            { files.length > 0 &&
              <div className="maha-files">
                { files.map((file, index) => (
                  <div className="maha-files-file" key={`file_${index}`}>
                    <Attachment { ...file } />
                  </div>
                ))}
              </div>
            }
          </div>
          <Reactions { ...this._getReactions() } />
        </div>
        { show &&
          <div className="maha-message-actions">
            <div className="maha-message-action">
              <div className="maha-message-reply" title="Reply to this comment" onClick={ this._handleQuoteComment }>
                <i className="fa fa-fw fa-arrow-circle-left" />
              </div>
            </div>
            <div className="maha-message-action">
              <Reaction { ...this._getReaction() } />
            </div>
            <div className="maha-message-action">
              <div className="maha-message-reply" title="Reply to this comment" onClick={ this._handleDestroyComment }>
                <i className="fa fa-fw fa-times" />
              </div>
            </div>
          </div>
        }
      </div>
    )
  }

  _getGallery() {
    const { id, images } = this.props
    return {
      images,
      attachable_type: 'chat_messages',
      attachable_id: id
    }
  }

  _getMessage() {
    return {
      className: 'maha-message inline',
      onMouseEnter: this._handleShowActions,
      onMouseLeave: this._handleHideActions
    }
  }

  _getRichtext() {
    const { attachments, text } = this.props
    return {
      text: text,
      attachments: attachments
    }
  }

  _getReaction() {
    const { id, reactions } = this.props
    return {
      id,
      reactions,
      table: 'maha_comments'
    }
  }

  _getReactions() {
    const { id, reactions } = this.props
    return {
      id,
      reactions,
      table: 'maha_comments'
    }
  }

  _handleDestroyComment() {
    const { network, confirm } = this.context
    const { entity, uid } = this.props
    const yes = () => network.request({
      method: 'DELETE',
      endpoint: `/api/admin/${entity}/comments/${uid}`
    })
    confirm.open('Are you sure you want to delete this comment?', yes)
  }

  _handleHideActions() {
    this.setState({ show: false })
  }

  _handleQuoteComment() {
    this.props.onQuoteComment()
  }

  _handleShowActions() {
    this.setState({ show: true })
  }

}

const mapStateToProps = (state, props) => ({
  files: files(state, props),
  images: images(state, props),
  media: media(state, props)
})

export default connect(mapStateToProps)(Comment)
