import Emoji from '../../emojis/emoji'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import map from './map'
import _ from 'lodash'

class Reaction extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    id: PropTypes.number,
    reactions: PropTypes.array,
    type: PropTypes.string,
    table: PropTypes.string,
    user: PropTypes.object,
    user_reactions: PropTypes.array,
    onReact: PropTypes.func,
    onUnreact: PropTypes.func
  }

  state = {
    show: false
  }

  _handleHideReactions = this._handleHideReactions.bind(this)
  _handleShowReactions = this._handleShowReactions.bind(this)
  _handleReaction = this._handleReaction.bind(this)

  render() {
    const { reactions, type, user } = this.props
    const { show } = this.state
    if(reactions.length === 0) return null
    return (
      <div { ...this._getReaction() }>
        { show &&
          <div className="maha-reactions-reaction-users">
            { reactions.map((reaction, index) => (
              <div className="maha-reactions-reaction-user" key={ `user_${reaction.id}` }>
                { user.id === reaction.id ? 'You' : reaction.full_name }
              </div>
            ))}
          </div>
        }
        <Emoji unicode={ map[type] } />
        { reactions.length }
      </div>
    )
  }

  _getReaction() {
    return {
      className: 'maha-reactions-reaction',
      onMouseEnter: this._handleShowReactions,
      onMouseLeave: this._handleHideReactions,
      onClick: this._handleReaction
    }
  }

  _handleHideReactions() {
    this.setState({ show: false })
  }

  _handleShowReactions() {
    this.setState({ show: true })
  }

  _handleReaction() {
    const { id, table, type, user, user_reactions, onReact, onUnreact } = this.props
    const action = _.includes(user_reactions, type) ? onUnreact : onReact
    action(table, id, {
      id: user.id,
      full_name: user.full_name,
      initials: user.initials,
      photo: user.photo,
      type
    })
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/${table}/${id}/react/${type}`,
      onFailure: (result) => {},
      onSuccess: (result) => {}
    })
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Reaction)
