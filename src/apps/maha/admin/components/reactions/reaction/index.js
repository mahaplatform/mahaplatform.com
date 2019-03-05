import { user_reactions } from './selectors'
import { connect } from 'react-redux'
import * as actions from './actions'
import Emoji from '../../emojis/emoji'
import PropTypes from 'prop-types'
import Tooltip from '../../tooltip'
import reactions from './map'
import React from 'react'
import _ from 'lodash'

class Reaction extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    reactions: PropTypes.array,
    table: PropTypes.string,
    id: PropTypes.number,
    user_reactions: PropTypes.array,
    onReact: PropTypes.func,
    onUnreact: PropTypes.func
  }

  state = {
    show: false
  }

  _handleHideReactions = this._handleHideReactions.bind(this)
  _handleToggleReactions = this._handleToggleReactions.bind(this)

  render() {
    const { show } = this.state
    return (
      <div className="maha-reaction-add" title="Add a reaction">
        <div className="maha-reaction-add-button" onClick={ this._handleToggleReactions }>
          <i className="fa fa-fw fa-smile-o" />
        </div>
        { show &&
          <div className="maha-reaction-add-items">
            { reactions.map((reaction, index) => (
              <div { ...this._getReaction(reaction.type) } key={`reaction_${reaction.type}`}>
                <Tooltip label={ reaction.label } />
                <Emoji unicode={ reaction.unicode } />
              </div>
            ))}
          </div>
        }
      </div>
    )
  }

  _getReaction(reaction) {
    return {
      className: 'maha-reaction-add-item maha-tooltip',
      onClick: this._handleReact.bind(this, reaction)
    }
  }

  _handleReact(type, e) {
    const { table, id, user, onReact, onUnreact } = this.props
    const action = _.includes(user_reactions, type) ? onUnreact : onReact
    this.setState({ show: false })
    action(table, id, {
      id: user.id,
      full_name: user.full_name,
      initials: user.initials,
      photo: user.photo,
      type
    })
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/admin/${table}/${id}/react/${type}`
    })
  }

  _handleHideReactions() {
    this.setState({ show: false })
  }

  _handleToggleReactions() {
    this.setState({ show: !this.state.show })
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user,
  user_reactions: user_reactions(state, props)
})

export default connect(mapStateToProps, actions)(Reaction)
