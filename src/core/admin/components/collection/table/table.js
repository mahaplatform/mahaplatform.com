import AutoSizer from 'react-virtualized-auto-sizer'
import PropTypes from 'prop-types'
import Columns from './columns'
import React from 'react'
import Body from './body'

class Table extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    display: PropTypes.array,
    records: PropTypes.array,
    rowClass: PropTypes.func,
    sort: PropTypes.object,
    visible: PropTypes.array,
    width: PropTypes.number,
    widths: PropTypes.array,
    onClick: PropTypes.func,
    onReachBottom: PropTypes.func,
    onSetWidth: PropTypes.func,
    onSort: PropTypes.func,
    onToggleHidden: PropTypes.func
  }

  state = {
    width: null
  }

  _handleResize = this._handleResize.bind(this)

  render() {
    const { sort, visible } = this.props
    return (
      <div className="maha-table">
        <div className="maha-table-head">
          <div className="maha-table-row">
            { visible.map((column, index) => (
              <div key={`header_${index}`} { ...this._getHeader(column, index) }>
                { column.label }
                { sort && (column.key === sort.key || column.sort === sort.key) &&
                  (sort.order === 'asc' ? <i className="fa fa-caret-up" /> : <i className="fa fa-caret-down" />)
                }
              </div>
            ))}
            <Columns { ...this._getColumns() } />
          </div>
        </div>
        <div className="maha-table-body">
          <AutoSizer { ...this._getAutoSizer() }>
            {(size) => (
              <Body { ...this._getBody(size) } />
            )}
          </AutoSizer>
        </div>
      </div>
    )
  }

  _getAutoSizer() {
    return {
      onResize: this._handleResize
    }
  }

  _getBody(size) {
    const { records, rowClass, visible, width, widths, onClick, onReachBottom } = this.props
    return {
      columns: visible,
      records,
      rowClass,
      size: {
        width: width || size.width,
        height: size.height
      },
      visible,
      widths,
      onClick,
      onReachBottom
    }
  }

  _getColumns() {
    const { onToggleHidden } = this.props
    return {
      columns: this.props.display,
      onToggleHidden
    }
  }

  _getHeader(column, index) {
    const { widths } = this.props
    return {
      style: widths[index],
      className: this._getHeaderClass(column),
      onClick: this._handleSort.bind(this, column)
    }
  }

  _getHeaderClass(column) {
    let classes = ['maha-table-cell','padded']
    if(column.primary === true) classes.push('mobile')
    if(column.format === 'check' || column.collapsing === true) classes.push('collapsing')
    return classes.join(' ')
  }

  _handleResize(size) {
    this.props.onSetWidth(size.width)
  }

  _handleSort(column) {
    const key = column.sort || column.key
    this.props.onSort(key)
  }

}

export default Table
