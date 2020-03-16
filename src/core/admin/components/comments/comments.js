import QuotedComment from './comment/quoted_comment'
import { connect } from 'react-redux'
import Composer from '../composer'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Comment from './comment'
import Avatar from '../avatar'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class Comments extends React.Component {

  static contextTypes = {
    confirm: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    active: PropTypes.bool,
    comments: PropTypes.array,
    defaultValue: PropTypes.array,
    editing: PropTypes.bool,
    endpoint: PropTypes.string,
    entity: PropTypes.string,
    hidden: PropTypes.number,
    placeholder: PropTypes.string,
    q: PropTypes.string,
    quoted_comment: PropTypes.object,
    quoted_comment_id: PropTypes.number,
    status: PropTypes.string,
    typing: PropTypes.object,
    user: PropTypes.object,
    onAdd: PropTypes.func,
    onCreate: PropTypes.func,
    onFetch: PropTypes.func,
    onQuoteComment: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onSetTyping: PropTypes.func,
    onShowMore: PropTypes.func,
    onType: PropTypes.func
  }

  static defaultProps = {
    active: true,
    placeholder: 'Write a comment...'
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleAddAssets = this._handleAddAssets.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleBeginType = this._handleBeginType.bind(this)
  _handleEndType = this._handleEndType.bind(this)
  _handleQuoteComment = this._handleQuoteComment.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleShowMore = this._handleShowMore.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { active, comments, editing, hidden, quoted_comment, status, typing } = this.props
    if(status === 'loading') {
      return (
        <div className="maha-comments message">
          <i className="fa fa-circle-o-notch fa-spin" /><br />
          Loading comments...
        </div>
      )
    }
    if(status === 'failed') {
      return (
        <div className="maha-comments message">
          <i className="fa fa-warning" /><br />
          Unable to load comments
        </div>
      )
    }
    return (
      <div className="maha-comments">
        { hidden > 0 &&
          <div className="maha-comments-more-wrapper">
            <div className="maha-comments-more" onClick={ this._handleShowMore }>
              View { hidden } more { pluralize('comment', hidden) }
            </div>
          </div>
        }
        <div className="maha-comments-body">
          { comments.map((comment, index) => (
            <Comment { ...this._getComment(comment) } key={`comment_${comment.id}`} />
          ))}
        </div>
        <div className="maha-comments-footer">
          { typing &&
            <div className="maha-comment">
              <div className="maha-comment-user">
                <Avatar user={ typing } />
              </div>
              <div className="maha-comment-bubble">
                <div className="maha-comment-typing">
                  { typing.full_name } is typing
                </div>
              </div>
            </div>
          }
          { quoted_comment &&
            <div className="chat-channel-extra">
              <div className="chat-channel-quote">
                <div className="chat-channel-quote-preview">
                  <QuotedComment comment={ quoted_comment } />
                </div>
                <div className="chat-channel-extra-remove">
                  <i className="fa fa-fw fa-times" onClick={ this._handleQuoteComment.bind(this, null) } />
                </div>
              </div>
            </div>
          }
          { !editing && active &&
            <Composer { ...this._getCreateComposer() } />
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { network } = this.context
    const { defaultValue, entity, onFetch, onSet } = this.props
    const target = `/admin/${entity}/comments`
    network.join(target)
    network.subscribe([
      { target, action: 'add_comment', handler: this._handleAdd },
      { target, action: 'begin_type_comment', handler: this._handleBeginType },
      { target, action: 'end_type_comment', handler: this._handleEndType },
      { target, action: 'remove_comment', handler: this._handleRemove }
    ])
    if(defaultValue) return onSet(defaultValue)
    const endpoint = `/api/admin/${entity}/comments`
    onFetch(endpoint)
  }

  componentDidUpdate(prevProps) {
    const { network } = this.context
    const { entity, q, user } = this.props
    const channel = `/admin/${entity}/comments`
    if(q.length > 0 && prevProps.q.length === 0) {
      network.message(channel, 'begin_type_comment', { user })
    } else if(q.length === 0 && prevProps.q.length > 0) {
      network.message(channel, 'end_type_comment', { user })
    }
  }

  componentWillUnmount() {
    const { entity } = this.props
    const { network } = this.context
    const target = `/admin/${entity}/comments`
    network.leave(target)
    network.unsubscribe([
      { target, action: 'add_comment', handler: this._handleAdd },
      { target, action: 'begin_type_comment', handler: this._handleBeginType },
      { target, action: 'end_type_comment', handler: this._handleEndType },
      { target, action: 'remove_comment', handler: this._handleRemove }

    ])
  }

  _getComment(comment) {
    const { entity } = this.props
    return {
      ...comment,
      entity,
      onQuoteComment: this._handleQuoteComment.bind(this, comment.id)
    }
  }

  _getCreateComposer() {
    return {
      icon: null,
      autofocus: true,
      defaultValue: this.props.q,
      placeholder: this.props.placeholder,
      onAddAssets: this._handleAddAssets,
      onUpdateAsset: () => {},
      onChange: this._handleType,
      onSubmit: this._handleCreate
    }
  }

  _getRichtext(comment) {
    return {
      text: comment.text,
      attachments: comment.attachments
    }
  }

  _handleAddAssets(assets) {
    const { quoted_comment, quoted_comment_id, entity, user, onCreate } = this.props
    onCreate(`/api/admin/${entity}/comments`, {
      attachments: [],
      asset_ids: assets.map(asset => asset.id),
      user,
      uid: _.random(100000000, 999999999).toString(36),
      reactions: [],
      quoted_comment,
      quoted_comment_id,
      text: '',
      created_at: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z',
      updated_at: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
    })
  }

  _handleShowMore() {
    this.props.onShowMore()
  }

  _handleClick() {
    const { editing } = this.props
    if(editing) return this._handleUpdate(this.props.q)
    this._handleCreate(this.props.q)
  }

  _handleType(text) {
    this.props.onType(text)
  }

  _handleCreate(text) {
    if(_.isEmpty(text)) return
    const { quoted_comment, quoted_comment_id, entity, user, onCreate } = this.props
    onCreate(`/api/admin/${entity}/comments`, {
      attachments: [],
      user,
      uid: _.random(100000000, 999999999).toString(36),
      reactions: [],
      quoted_comment,
      quoted_comment_id,
      text,
      created_at: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z',
      updated_at: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
    })
  }

  _handleAdd(data) {
    const { onAdd } = this.props
    onAdd(data.comment)
  }

  _handleBeginType(data) {
    const { user, onSetTyping } = this.props
    if(user.id !== data.user.id) onSetTyping(data.user)
  }

  _handleEndType(data) {
    this.props.onSetTyping(null)
  }

  _handleRemove({ uid }) {
    this.props.onRemove(uid)
  }

  _handleQuoteComment(id) {
    this.props.onQuoteComment(id)
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Comments)
