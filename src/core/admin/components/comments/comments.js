import { connect } from 'react-redux'
import Composer from './composer'
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
    defaultMode: PropTypes.string,
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

  state = {
    mode: 'expanded'
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleBeginType = this._handleBeginType.bind(this)
  _handleEndType = this._handleEndType.bind(this)
  _handleQuoteComment = this._handleQuoteComment.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleShow = this._handleShow.bind(this)
  _handleShowMore = this._handleShowMore.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { active, comments, editing, hidden, status, typing } = this.props
    const { mode } = this.state
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
        { mode === 'collapsed' && comments.length > 0 &&
          <div className="maha-comments-show">
            <span onClick={ this._handleShow }>
              View { pluralize('comment', comments.length, true) }
            </span>
          </div>
        }
        { mode === 'expanded' && comments.length > 0 &&
          <div className="maha-comments-body">
            { comments.map((comment, index) => (
              <Comment { ...this._getComment(comment) } key={`comment_${comment.id}`} />
            ))}
          </div>
        }
        { !editing && active &&
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
            <Composer { ...this._getComposer() } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, defaultMode, onSet } = this.props
    this._handleJoin()
    if(defaultMode) this.setState({ mode: defaultMode })
    if(defaultValue) return onSet(defaultValue)
    this._handleFetch()
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
    this._handleLeave()
  }

  _getComment(comment) {
    const { entity } = this.props
    return {
      ...comment,
      entity,
      onQuoteComment: this._handleQuoteComment.bind(this, comment.id)
    }
  }

  _getComposer() {
    const { quoted_comment } = this.props
    return {
      placeholder: this.props.placeholder,
      quoted: quoted_comment,
      onSubmit: this._handleCreate
    }
  }

  _getRichtext(comment) {
    return {
      text: comment.text,
      attachments: comment.attachments
    }
  }

  _handleAdd(data) {
    const { onAdd } = this.props
    onAdd(data.comment)
  }

  _handleBeginType(data) {
    const { user, onSetTyping } = this.props
    if(user.id !== data.user.id) onSetTyping(data.user)
  }

  _handleClick() {
    const { editing } = this.props
    if(editing) return this._handleUpdate(this.props.q)
    this._handleCreate(this.props.q)
  }

  _handleCreate({ attachments, link, quoted, text }) {
    const { entity, user, onAdd, onCreate } = this.props
    const comment = {
      uid: _.random(100000000, 999999999).toString(36),
      text
    }
    onAdd({
      ...comment,
      quoted_comment: quoted,
      attachments,
      link,
      reactions: [],
      user,
      created_at: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z',
      updated_at: moment().utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
    })
    onCreate(`/api/admin/${entity}/comments`, {
      ...comment,
      asset_ids: attachments.map(asset => asset.id),
      link_id: link ? link.id : null,
      quoted_comment_id: quoted ? quoted.id : null
    })
    this._handleShow()
  }

  _handleEndType(data) {
    this.props.onSetTyping(null)
  }

  _handleFetch() {
    const { entity, onFetch } = this.props
    const endpoint = `/api/admin/${entity}/comments`
    onFetch(endpoint)
  }

  _handleJoin() {
    const { network } = this.context
    const { entity } = this.props
    const target = `/admin/${entity}/comments`
    network.join(target)
    network.subscribe([
      { target, action: 'add_comment', handler: this._handleAdd },
      { target, action: 'begin_type_comment', handler: this._handleBeginType },
      { target, action: 'end_type_comment', handler: this._handleEndType },
      { target, action: 'remove_comment', handler: this._handleRemove }
    ])
  }

  _handleLeave() {
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

  _handleQuoteComment(id) {
    this.props.onQuoteComment(id)
  }

  _handleRemove({ uid }) {
    this.props.onRemove(uid)
  }

  _handleShow() {
    this.setState({
      mode: 'expanded'
    })
  }

  _handleShowMore() {
    this.props.onShowMore()
  }

  _handleType(text) {
    this.props.onType(text)
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Comments)
