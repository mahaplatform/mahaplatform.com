import PropTypes from 'prop-types'
import Table from './table'
import React from 'react'

class Results extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    columns: PropTypes.array,
    handler: PropTypes.func,
    layout: PropTypes.any,
    link: PropTypes.func,
    modal: PropTypes.func,
    records: PropTypes.array,
    recordTasks: PropTypes.func,
    rowClass: PropTypes.func,
    selectable: PropTypes.bool,
    selectAll: PropTypes.bool,
    selected: PropTypes.array,
    sort: PropTypes.object,
    status: PropTypes.string,
    table: PropTypes.array,
    onLoadMore: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSort: PropTypes.func
  }

  render() {
    const { layout, table } = this.props
    if(table) return <Table { ...this._getTable() } />
    if(layout) return React.createElement(layout, { ...this._getCustomLayout() })
  }

  _getTable() {
    const { code, handler, link, modal, records, recordTasks, rowClass, table, selectAll, selectable, selected, sort, status, onLoadMore, onSelect, onSelectAll, onSort } = this.props
    const columns = table
    return {
      code,
      columns,
      handler,
      link,
      modal,
      records,
      recordTasks,
      rowClass,
      selectAll,
      selectable,
      selected,
      sort,
      status,
      onLoadMore,
      onSelect,
      onSelectAll,
      onSort
    }
  }

  _getCustomLayout() {
    const { records, sort, status, onLoadMore, onSort  } = this.props
    return {
      records,
      sort,
      status,
      onLoadMore,
      onSort
    }
  }

}

export default Results
