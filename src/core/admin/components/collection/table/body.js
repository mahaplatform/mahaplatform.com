import { VariableSizeList as List } from 'react-window'
import PropTypes from 'prop-types'
import memoize from 'memoize-one'
import Loader from '../../loader'
import React from 'react'
import Row from './row'
import _ from 'lodash'

const average = memoize(
  (heights) => Object.values(heights).length > 0 ? (Object.values(heights).reduce((total, height) => {
    return total + height
  }, 0) / Object.values(heights).length) : 42
)

class Body extends React.Component {

  static propTypes = {
    columns: PropTypes.array,
    records: PropTypes.array,
    recordTasks: PropTypes.func,
    rowClass: PropTypes.func,
    selectable: PropTypes.bool,
    selected: PropTypes.object,
    selectAll: PropTypes.bool,
    selectValue: PropTypes.string,
    size: PropTypes.object,
    total: PropTypes.number,
    widths: PropTypes.array,
    onClick: PropTypes.func,
    onReachBottom: PropTypes.func,
    onSelect: PropTypes.func
  }

  list = null
  notified = false

  state = {
    heights: {},
    ready: false
  }

  _handleItemSize = this._handleItemSize.bind(this)
  _handleReady = this._handleReady.bind(this)
  _handleScroll = this._handleScroll.bind(this)
  _handleSetHeight = this._handleSetHeight.bind(this)

  render() {
    const { ready } = this.state
    return [
      ...!ready ? [<Loader key="loader" />] : [],
      <List key="list" { ...this._getList() }>
        { Row }
      </List>
    ]
  }

  componentDidMount() {
    setTimeout(this._handleReady, 10)
  }

  componentDidUpdate(prevProps) {
    const { records } = this.props
    if(!_.isEqual(records, prevProps.records)) {
      this.notified = false
    }
  }

  _getList() {
    const { columns, records, recordTasks, rowClass, selectable, selected, selectAll, selectValue, size, widths, onClick, onSelect } = this.props
    const { heights, ready } = this.state
    const { height, width } = size
    return {
      innerRef: node => this.inner = node,
      ref: node => this.list = node,
      className: `maha-table-scrollable ${!ready ? 'hidden' : ''}`,
      overscanCount: 10,
      height,
      itemCount: records.length,
      itemData: {
        columns,
        records,
        recordTasks,
        rowClass,
        selectable,
        selected,
        selectAll,
        selectValue,
        widths,
        heights,
        onClick,
        onSelect,
        onSetHeight: this._handleSetHeight
      },
      estimatedItemSize: average(heights),
      itemSize: this._handleItemSize,
      width,
      onScroll: this._handleScroll
    }
  }

  _handleItemSize(index) {
    const { heights } = this.state
    return heights[index] || average(heights)
  }

  _handleReady() {
    this.setState({
      ready: true
    })
  }

  _handleScroll({ scrollOffset }) {
    const { offsetHeight } = this.inner
    const percent = (scrollOffset / offsetHeight) * 100
    if(!this.notified && percent > 80) {
      this.props.onReachBottom()
      this.notified = true
    }
  }

  _handleSetHeight(index, height) {
    this.setState({
      heights: {
        ...this.state.heights,
        [index]: height
      }
    }, () => {
      this.list.resetAfterIndex(index)
    })
  }

}

export default Body