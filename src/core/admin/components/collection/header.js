import Searchbox from '../searchbox'
import PropTypes from 'prop-types'
import Button from '../button'
import Export from './export'
import React from 'react'

class Header extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    criteria: PropTypes.object,
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
    const { criteria, filters, search, tasks } = this.props
    if(!filters && !this.props.export && !search && !tasks) return null
    return (
      <div className="maha-collection-header">
        <div className="maha-collection-header-bar">
          { (filters || criteria) &&
            <Button { ...this._getFilter() } />
          }
          { search &&
            <Searchbox { ...this._getSearchbox() } />
          }
          <Export { ...this._getExport() } />
          <Button { ...this._getRefresh() } />
        </div>
      </div>
    )
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

  _getFilter() {
    const { filtering } = this.props
    return {
      icon: filtering ? 'times' : 'filter',
      className: 'maha-collection-header-action',
      handler: this._handleToggleFilter,
      tooltip: {
        title: filtering ? 'Close Filter' : 'Filter Records',
        position: 'bottom left'
      }
    }
  }

  _getRefresh() {
    return {
      icon: 'refresh',
      className: 'maha-collection-header-action',
      handler: this._handleRefresh,
      tooltip: {
        title: 'Reload Records',
        position: 'bottom right'
      }
    }
  }

  _getSearchbox() {
    const { onSetQuery } = this.props
    return {
      onChange: onSetQuery
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
