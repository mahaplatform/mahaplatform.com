import PropTypes from 'prop-types'
import Explorer from '../explorer'
import React from 'react'

class Manager extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  state = {
    datasets: []
  }

  render() {
    return (
      <div className="datasets-manager">
        <div className="datasets-manager-sidebar">
          <Explorer {...this._getExplorer() } />
        </div>
        <div className="datasets-manager-main">
          main
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch()
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

}

export default Manager
