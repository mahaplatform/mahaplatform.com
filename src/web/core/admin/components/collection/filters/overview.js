import ModalPanel from '../../modal_panel'
import PropTypes from 'prop-types'
import Lookup from './lookup'
import Select from './select'
import Toggle from './toggle'
import Daterange from './daterange'
import React from 'react'

class Overview extends React.Component {

  static propTypes = {
    filters: PropTypes.array,
    results: PropTypes.object,
    onAddPanel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onRemovePanel: PropTypes.func,
    onReset: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleReset = this._handleReset.bind(this)

  render() {
    const { filters } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-collection-filters-panel">
          <div className="maha-collection-filters-body">
            { filters.map((filter, index) => {
              if(filter.type === 'toggle') return <Toggle {...this._getToggle(filter) } key={`filter_${index}`} />
              if(filter.type === 'lookup') return <Lookup {...this._getLookup(filter) } key={`filter_${index}`} />
              if(filter.type === 'select') return <Select {...this._getSelect(filter) } key={`filter_${index}`} />
              if(filter.type === 'daterange') return <Daterange {...this._getDaterange(filter) } key={`filter_${index}`} />
            })}
          </div>
          <div className="maha-collection-filters-footer">
            <button className="ui red fluid button" onClick={ this._handleReset}>
              Reset Filters
            </button>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Filter Results',
      color: 'lightgrey'
    }
  }

  _getToggle(filter) {
    const { results, onChange } = this.props
    const { format, label, name } = filter
    return {
      format,
      label,
      name,
      results,
      onChange
    }
  }

  _getLookup(filter) {
    const { results, onAddPanel, onChange, onRemovePanel } = this.props
    const { format, label, multiple, options } = filter
    return {
      format,
      label,
      multiple,
      name,
      options,
      results,
      onAddPanel,
      onChange,
      onRemovePanel
    }
  }

  _getSelect(filter) {
    const { results, onAddPanel, onChange, onRemovePanel } = this.props
    return {
      ...filter,
      results,
      onAddPanel,
      onChange,
      onRemovePanel
    }
  }

  _getDaterange(filter) {
    const { results, onAddPanel, onChange, onRemovePanel } = this.props
    return {
      ...filter,
      results,
      onAddPanel,
      onChange,
      onRemovePanel
    }
  }

  _handleDone() {
    this.props.onDone()
  }

  _handleReset() {
    this.props.onReset()
  }

}

export default Overview
