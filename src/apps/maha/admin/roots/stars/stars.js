import PropTypes from 'prop-types'
import React from 'react'

class Star extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    stars: PropTypes.object,
    onUpdate: PropTypes.func
  }

  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return this.props.children
  }

  componentDidMount() {
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _handleJoin() {
    const { network } = this.context
    const target = '/admin/stars'
    network.join(target)
    network.subscribe([
      { target, action: 'update_stars', handler: this._handleUpdate }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const target = '/admin/stars'
    network.leave(target)
    network.unsubscribe([
      { target, action: 'update_stars', handler: this._handleUpdate }
    ])
  }

  _handleUpdate({ table, id, starred }) {
    this.props.onUpdate(table, id, starred)
  }

}

export default Star
