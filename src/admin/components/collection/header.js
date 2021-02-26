import Searchbox from '../searchbox'
import PropTypes from 'prop-types'
import Button from '../button'
import Export from './export'
import React from 'react'

class Header extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    columns: PropTypes.array,
    criteria: PropTypes.object,
    endpoint: PropTypes.string,
    entity: PropTypes.string,
    filter: PropTypes.object,
    filtering: PropTypes.bool,
    filters: PropTypes.array,
    search: PropTypes.bool,
    sort: PropTypes.object,
    tasks: PropTypes.object,
    onRefresh: PropTypes.func,
    onSetQuery: PropTypes.func,
    onToggleFilter: PropTypes.func
  }

  _handleRefresh = this._handleRefresh.bind(this)
  _handleToggleFilter = this._handleToggleFilter.bind(this)

  render() {
    const { columns, criteria, filters, search, tasks } = this.props
    if(!filters && !columns && !search && !tasks) return null
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
        { tasks &&
          <Button { ...this._getTasks() } />
        }
      </div>
    )
  }

  _getExport() {
    const { columns, endpoint, entity, filter, sort } = this.props
    return {
      columns,
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

  _getTasks() {
    const { tasks } = this.props
    return {
      icon: tasks.icon,
      className: 'maha-collection-header-button',
      tasks: tasks.items
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
