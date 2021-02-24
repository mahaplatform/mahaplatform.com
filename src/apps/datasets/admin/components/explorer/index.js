import { ModalPanel } from '@admin'
import PropTypes from 'prop-types'
import Dataset from './dataset'
import React  from 'react'

class Explorer extends React.PureComponent {

  static propTypes = {
    datasets: PropTypes.array
  }

  static defaultProps = {
    datasets: []
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
      <ModalPanel { ...this._getPanel() }>
        <div className="datasets-explorer">
          { datasets.map((dataset, dindex) => (
            <Dataset { ...this._getDataset(dataset) } key={`dataset_${dindex}`} />
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getDataset(dataset) {
    return {
      dataset,
      selected: this.state,
      onSelect: this._handleSelect
    }
  }

  _getPanel() {
    return {}
  }

  _handleSelect(selected) {
    this.setState(selected)
  }

}

export default Explorer
