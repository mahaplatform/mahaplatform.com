import { VariableSizeList as List } from 'react-window'
import PropTypes from 'prop-types'
import React from 'react'
import Row from './row'
import _ from 'lodash'

class Body extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    records: PropTypes.array,
    rowClass: PropTypes.func,
    selectable: PropTypes.bool,
    selected: PropTypes.object,
    selectAll: PropTypes.bool,
    selectValue: PropTypes.string,
    size: PropTypes.object,
    widths: PropTypes.array,
    onClick: PropTypes.func,
    onReachBottom: PropTypes.func,
    onSelect: PropTypes.func
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
    const { columns, records, rowClass, selectable, selected, selectAll, selectValue, size, widths, onClick, onSelect } = this.props
    const { height, width } = size
    return {
      innerRef: node => this.inner = node,
      ref: this.list,
      className: 'maha-table-scrollable',
      overscanCount: 10,
      height,
      itemCount: records.length,
      itemData: {
        columns,
        records,
        rowClass,
        selectable,
        selected,
        selectAll,
        selectValue,
        widths,
        onClick,
        onSelect,
        onSetHeight: this._handleSetHeight
      },
      itemSize: this._handleItemSize,
      width,
      onScroll: this._handleScroll
    }
  }

  _handleItemSize(index) {
    return this.heights[index] || 42
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

export default Body
