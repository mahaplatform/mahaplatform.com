import AutoSizer from 'react-virtualized-auto-sizer'
import PropTypes from 'prop-types'
import React from 'react'
import Body from './body'

class Table extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    records: PropTypes.array,
    sort: PropTypes.object,
    visible: PropTypes.array,
    onReachBottom: PropTypes.func,
    onSort: PropTypes.func
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
    const { records, visible, onReachBottom } = this.props
    const { width } = this.state
    size.width = width || size.width
    return {
      columns: visible,
      records,
      size,
      visible,
      widths: this._getWidths(),
      onReachBottom
    }
  }

  _getHeader(column, index) {
    const widths = this._getWidths()
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

  _getWidths() {
    const { columns } = this.props
    const { width } = this.state
    const fixed = columns.filter(column => {
      return column.width !== undefined
    })
    const used = fixed.reduce((used, column) => {
      return used + (column.width || 0)
    }, 0)
    const available = width - used - 8
    const widths = columns.map(column => {
      return column.width || available / (columns.length - fixed.length)
    })
    return columns.map((column, index) => {
      const grow = column.width === undefined ? 1 : 0
      return {
        flex: `${grow} 1 ${widths[index]}px`
      }
    })
  }

  _handleResize(size) {
    this.setState({
      width: size.width
    })
  }

  _handleSort(column) {
    const key = column.sort || column.key
    this.props.onSort(key)
  }

}

export default Table
