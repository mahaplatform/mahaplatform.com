import Searchbox from '../searchbox'
import PropTypes from 'prop-types'
import Export from './export'
import React from 'react'

class Header extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    endpoint: PropTypes.string,
    entity: PropTypes.string,
    export: PropTypes.array,
    filter: PropTypes.object,
    filtering: PropTypes.bool,
    filters: PropTypes.array,
    search: PropTypes.bool,
    sort: PropTypes.object,
    tasks: PropTypes.array,
    onRefresh: PropTypes.func,
    onSetQuery: PropTypes.func,
    onToggleFilter: PropTypes.func
  }

  _handleRefresh = this._handleRefresh.bind(this)
  _handleToggleFilter = this._handleToggleFilter.bind(this)

  render() {
    const { filters, search, tasks } = this.props
    if(!filters && !this.props.export && !search && !tasks) return null
    return (
      <div className="maha-collection-header">
        <div className="maha-collection-header-bar">
          <div className="maha-collection-header-action" onClick={ this._handleToggleFilter }>
            <i className="fa fa-filter" />
          </div>
          { search && <Searchbox { ...this._getSearchbox() } /> }
          <Export { ...this._getExport() } />
          <div className="maha-collection-header-action" onClick={ this._handleRefresh }>
            <i className="fa fa-refresh" />
          </div>
        </div>
      </div>
    )
  }

  _getSearchbox() {
    const { onSetQuery } = this.props
    return {
      onChange: onSetQuery
    }
  }

  _getExport() {
    const { endpoint, entity, filter, sort } = this.props
    return {
      columns: this.props.export,
      endpoint,
      entity,
      filter,
      sort: sort.key ? (sort.order === 'desc' ? '-' : '') + sort.key : null
    }
  }

  _handleRefresh() {
    this.props.onRefresh()
  }

  _handleToggleFilter() {
    this.props.onToggleFilter()
  }

}

export default Header
