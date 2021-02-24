import PropTypes from 'prop-types'
import Explorer from '../explorer'
import React from 'react'
import Data from './data'

class Manager extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  state = {
    datasets: []
  }

  _handleFetch = this._handleFetch.bind(this)

  render() {
    return (
      <div className="datasets-manager">
        <div className="datasets-manager-sidebar">
          <Explorer {...this._getExplorer() } />
        </div>
        <div className="datasets-manager-main">
          <Data />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleJoin()
    this._handleFetch()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getExplorer() {
    const { datasets } = this.state
    return {
      datasets
    }
  }

  _handleFetch() {
    this.context.network.request({
      endpoint: '/api/admin/datasets/datasets',
      method: 'get',
      onSuccess: (result) => {
        this.setState({
          datasets: result.data
        })
      }
    })
  }

  _handleJoin() {
    const { network } = this.context
    const target = '/admin/datasets/datasets'
    network.join(target)
    network.subscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const target = '/admin/datasets/datasets'
    network.leave(target)
    network.unsubscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

}

export default Manager
