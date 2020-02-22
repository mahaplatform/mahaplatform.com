import { VariableSizeList as List } from 'react-window'
import PropTypes from 'prop-types'
import React from 'react'
import Row from './row'
import _ from 'lodash'

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
      className: 'maha-table-scrollable',
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

export default Body
