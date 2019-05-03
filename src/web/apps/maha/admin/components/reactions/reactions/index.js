import { reactions, total, user_reactions } from './selectors'
import * as actions from './actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Reaction from './reaction'
import React from 'react'

class Reactions extends React.Component {

  static propTypes = {
    id: PropTypes.number,
    reactions: PropTypes.object,
    table: PropTypes.string,
    total: PropTypes.number,
    user_reactions: PropTypes.array,
    onReact: PropTypes.func,
    onUnreact: PropTypes.func
  }

  _handleReact = this._handleReact.bind(this)
  _handleUnreact = this._handleUnreact.bind(this)

  render() {
    const { reactions, total } = this.props
    if(total === 0) return null
    return (
      <div className="maha-reactions">
        { Object.keys(reactions).map((type, index) => (
          <Reaction { ...this._getReaction(type) } key={`reaction_${type}`} />
        )) }
      </div>
    )
  }

  _getReaction(type) {
    const { id, reactions, table, user_reactions } = this.props
    return {
      id,
      reactions: reactions[type],
      type,
      table,
      user_reactions,
      onReact: this._handleReact,
      onUnreact: this._handleUnreact
    }
  }

  _handleReact(table, id, reaction) {
    this.props.onReact(table, id, reaction)
  }

  _handleUnreact(table, id, reaction) {
    this.props.onUnreact(table, id, reaction)
  }

}

const mapStateToProps = (state, props) => ({
  reactions: reactions(state, props),
  total: total(state, props),
  user_reactions: user_reactions(state, props)
})

export default connect(mapStateToProps, actions)(Reactions)
