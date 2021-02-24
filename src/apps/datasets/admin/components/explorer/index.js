import PropTypes from 'prop-types'
import Dataset from './dataset'
import React  from 'react'

class Explorer extends React.PureComponent {

  static propTypes = {
    datasets: PropTypes.array
  }

  state = {
    dataset_id: null,
    type_id: null,
    view: null
  }

  _handleSelect = this._handleSelect.bind(this)

  render() {
    const { datasets } = this.props
    return (
      <div className="datasets-explorer">
        { datasets.map((dataset, dindex) => (
          <Dataset { ...this._getDataset(dataset) } key={`dataset_${dindex}`} />
        )) }
      </div>
    )
  }

  _getDataset(dataset) {
    return {
      dataset,
      selected: this.state,
      onSelect: this._handleSelect
    }
  }

  _handleSelect(selected) {
    this.setState(selected)
  }

}

export default Explorer
