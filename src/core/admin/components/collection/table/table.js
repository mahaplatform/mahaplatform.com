import AutoSizer from 'react-virtualized-auto-sizer'
import PropTypes from 'prop-types'
import Loader from '../../loader'
import Columns from './columns'
import React from 'react'
import Body from './body'
import _ from 'lodash'

class Table extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    columns: PropTypes.array,
    defaults: PropTypes.array,
    display: PropTypes.array,
    hidden: PropTypes.array,
    records: PropTypes.array,
    rowClass: PropTypes.func,
    selectable: PropTypes.bool,
    selected: PropTypes.object,
    selectAll: PropTypes.bool,
    selectValue: PropTypes.string,
    sort: PropTypes.object,
    status: PropTypes.string,
    visible: PropTypes.array,
    width: PropTypes.number,
    widths: PropTypes.array,
    onClick: PropTypes.func,
    onLoadHidden: PropTypes.func,
    onReachBottom: PropTypes.func,
    onSaveHidden: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSetWidth: PropTypes.func,
    onSort: PropTypes.func,
    onToggleHidden: PropTypes.func
  }

  static defaultProps = {
    onSelect: (id) => {},
    onSelectAll: () => {}
  }

  state = {
    width: null
  }

  _handleResize = this._handleResize.bind(this)
  _handleSelectAll = this._handleSelectAll.bind(this)

  render() {
    const { records, selectable, selectAll, sort, status, visible } = this.props
    if(status !== 'success') return <Loader />
    const first = records.length > 0 ? records[0].id : 0
    return (
      <div className="maha-table">
        <div className="maha-table-head">
          <div className="maha-table-row">
            { selectable &&
              <div className="maha-table-check-cell" onClick={ this._handleSelectAll }>
                { selectAll ? <i className="fa fa-check-circle" /> : <i className="fa fa-circle-o" /> }
              </div>
            }
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
              <Body key={`body_${first}`} { ...this._getBody(size) } />
            )}
          </AutoSizer>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaults, code, onLoadHidden } = this.props
    onLoadHidden(code, defaults)
  }

  componentDidUpdate(prevProps) {
    const { code, hidden, onSaveHidden } = this.props
    if(!_.isEqual(hidden, prevProps.hidden)) {
      onSaveHidden(code, hidden)
    }
  }

  _getAutoSizer() {
    return {
      onResize: this._handleResize
    }
  }

  _getBody(size) {
    const { records, rowClass, selected, selectable, selectAll, selectValue, visible, width, widths, onClick, onReachBottom, onSelect } = this.props
    return {
      columns: visible,
      records,
      rowClass,
      selected,
      selectable,
      selectAll,
      selectValue,
      size: {
        width: width || size.width,
        height: size.height
      },
      widths,
      onClick,
      onReachBottom,
      onSelect
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

  _handleSelectAll() {
    this.props.onSelectAll()
  }

  _handleSort(column) {
    const key = column.sort || column.key
    this.props.onSort(key)
  }

}

export default Table
