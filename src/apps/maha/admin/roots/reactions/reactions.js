import PropTypes from 'prop-types'
import React from 'react'

class Reactions extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    reactions: PropTypes.object,
    onUpdate: PropTypes.func
  }

  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return null
  }

  componentDidMount() {
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _handleJoin() {
    const { network } = this.context
    const target = '/admin/reactions'
    network.join(target)
    network.subscribe([
      { target, action: 'update_reactions', handler: this._handleUpdate }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const target = '/admin/reactions'
    network.leave(target)
    network.unsubscribe([
      { target, action: 'update_reactions', handler: this._handleUpdate }
    ])
  }

  _handleUpdate({ table, id, reactions }) {
    this.props.onUpdate(table, id, reactions)
  }

}

export default Reactions
