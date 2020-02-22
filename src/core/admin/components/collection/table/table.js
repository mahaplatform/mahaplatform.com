import AutoSizer from 'react-virtualized-auto-sizer'
import { VariableSizeList as List } from 'react-window'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Row extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    style: PropTypes.object
  }

  row = null

  state = {
    height: null
  }

  _handleSetHeight = this._handleSetHeight.bind(this)

  render() {
    const { data, index } = this.props
    const { columns, records } = data
    return (
      <div className="table-row" style={ this._getRowStyle() } ref={ node => this.row = node }>
        { columns.map((column, i) => (
          <div className="table-cell" key={`column_${i}`} style={ this._getStyle(i) }>
            { _.get(records[index], column.key) }
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    setTimeout(this._handleSetHeight, 50)
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props
    if(!_.isEqual(data.width, prevProps.data.width)) {
      this._handleSetHeight()
    }
  }

  _getRowStyle() {
    const { height } = this.state
    const { style } = this.props
    return {
      position: style.position,
      left: style.left,
      top: style.top,
      width: style.width,
      ...height ? { height } : {}
    }
  }

  _getStyle(index) {
    const { data } = this.props
    return data.widths[index]
  }

  _handleSetHeight() {
    if(!this.row) return
    const { index } = this.props
    this.setState({
      height: null
    }, () => {
      let height = 0
      this.row.childNodes.forEach((node, index) => {
        height = Math.max(height, node.getBoundingClientRect().height)
      })
      this.setState({ height })
      this.props.data.onSetHeight(index, height)
    })
  }

}

class Body extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    records: PropTypes.array,
    size: PropTypes.object,
    widths: PropTypes.array,
    onReachBottom: PropTypes.func
  }

  heights = {}
  notified = false

  list = React.createRef()

  _handleItemSize = this._handleItemSize.bind(this)
  _handleScroll = this._handleScroll.bind(this)
  _handleSetHeight = this._handleSetHeight.bind(this)

  render() {
    return (
      <List { ...this._getList() }>
        { Row }
      </List>
    )
  }

  componentDidUpdate(prevProps) {
    const { records } = this.props
    if(!_.isEqual(records, prevProps.records)) {
      this.notified = false
    }
  }

  _getList() {
    const { columns, records, size, widths } = this.props
    const { height, width } = size
    return {
      innerRef: node => this.inner = node,
      ref: this.list,
      className: 'table-scrollable',
      overscanCount: 15,
      height,
      itemCount: records.length,
      itemData: {
        columns,
        records,
        widths,
        onSetHeight: this._handleSetHeight
      },
      itemSize: this._handleItemSize,
      width,
      onScroll: this._handleScroll
    }
  }

  _handleItemSize(index) {
    return this.heights[index] || 35
  }

  _handleScroll({ scrollOffset }) {
    const { offsetHeight } = this.inner
    const percent = (scrollOffset / offsetHeight) * 100
    if(!this.notified && percent > 60) {
      this.props.onReachBottom()
      this.notified = true
    }
  }

  _handleSetHeight(index, height) {
    this.heights = {
      ...this.heights,
      [index]: height
    }
    this.list.current.resetAfterIndex(index)
  }

}

class Table extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    records: PropTypes.array,
    onReachBottom: PropTypes.func
  }

  state = {
    width: null
  }

  _handleResize = this._handleResize.bind(this)

  render() {
    const { columns } = this.props
    const widths = this._getWidths()
    return (
      <div className="table">
        <div className="table-head">
          <div className="table-row">
            { columns.map((column, index) => (
              <div className="table-cell" key={`column_${index}`} style={ widths[index] }>
                { column.label }
              </div>
            ))}
          </div>
        </div>
        <div className="table-body">
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
    const { columns, records, onReachBottom } = this.props
    const { width } = this.state
    size.width = width || size.width
    return {
      columns,
      records,
      size,
      widths: this._getWidths(),
      onReachBottom
    }
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

}

export default Table
