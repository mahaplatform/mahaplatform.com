import PropTypes from 'prop-types'
import Overview from './overview'
import React from 'react'

class Saved extends React.Component {

  static propTypes = {
  }

  render() {
    const saved = [
      { name: 'Saved Filter 1', results: { } }
    ]
    return (
      <div className="maha-filters-panel">
        <div className="maha-filters-header">
          <div className="maha-filters-header-icon" onClick={ this._handleDone.bind(this) }>
            <i className="fa fa-chevron-left" />
          </div>
          <div className="maha-filters-header-title">
            Saved Filters
          </div>
          <div className="maha-filters-header-icon" />
        </div>
        <div className="maha-filters-body">
          { saved.map((filter, index) => (
            <div key={`filter_${index}`} className="maha-filters-item" onClick={ this._handleLoadFilter.bind(this, filter) }>
              <div className="maha-filters-item-title">
                <i className="fa fa-fw fa-filter" />
                { filter.name }
              </div>
              <div className="maha-filters-item-icon">
                <i className="fa fa-chevron-right" />
              </div>
            </div>
          ))}
          <div className="maha-filters-item" onClick={ this._handleNewFilter.bind(this) }>
            <div className="maha-filters-item-title">
              <i className="fa fa-fw fa-plus" />
              New Filter
            </div>
            <div className="maha-filters-item-icon">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getOverview() {
    return this.props
  }

  _handleLoadFilter(filter) {
    this.props.onSet(filter.results)
    this.props.onAddPanel(<Overview { ...this._getOverview() } />)
  }

  _handleNewFilter() {
    this.props.onAddPanel(<Overview { ...this._getOverview() } />)
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Saved
