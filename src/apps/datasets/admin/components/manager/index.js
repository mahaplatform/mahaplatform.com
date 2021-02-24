import PropTypes from 'prop-types'
import Explorer from '../explorer'
import React from 'react'

class Manager extends React.PureComponent {

  static propTypes = {
    datasets: PropTypes.array
  }

  static defaultProps = {
    datasets: [
      { id: 1, title: 'Dataset 1', types: [
        { id: 1, title: 'Type 1a' },
        { id: 2, title: 'Type 1b' }
      ] },
      { id: 2, title: 'Dataset 2', types: [
        { id: 3, title: 'Type 2a' },
        { id: 4, title: 'Type 2b' }
      ] }
    ]
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

  _getExplorer() {
    const { datasets } = this.props
    return {
      datasets
    }
  }

}

export default Manager
