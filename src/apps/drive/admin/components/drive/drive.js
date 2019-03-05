import PropTypes from 'prop-types'
import React from 'react'

class Drive extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
  }

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
    const target = '/admin/drive'
    network.join(target)
    // network.subscribe([
    // ])
  }

  _handleLeave() {
    const { network } = this.context
    const target = '/admin/drive'
    network.leave(target)
    // network.unsubscribe([
    // ])
  }

}

export default Drive
