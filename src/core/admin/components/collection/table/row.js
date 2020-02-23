import PropTypes from 'prop-types'
import Format from '../../format'
import React from 'react'
import _ from 'lodash'

class Row extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    rowClass: PropTypes.func,
    style: PropTypes.object,
    onClick: PropTypes.func
  }

  row = null

  state = {
    height: null
  }

  _handleSetHeight = this._handleSetHeight.bind(this)

  render() {
    const { data, index } = this.props
    const { columns, records } = data
    const record = records[index]
    return (
      <div { ...this._getRow() }>
        { columns.map((column, cindex) => (
          <div key={`column_${cindex}`} { ...this._getCell(column, cindex) }>
            <Format { ...this._getFormat(record, column) } />
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

  _getCell(column, cindex) {
    return {
      className: this._getCellClass(column),
      style: this._getStyle(cindex)
    }
  }

  _getCellClass(column) {
    let classes = ['maha-table-cell']
    if(column.primary === true) classes.push('mobile')
    if(column.format === 'check' || column.collapsing === true) classes.push('collapsing')
    if(column.format === 'check' || column.centered === true) classes.push('centered')
    if(column.format === 'currency') classes.push('right')
    if(!_.isFunction(column.format) && !_.isElement(column.format)) classes.push('padded')
    return classes.join(' ')
  }

  _getFormat(record, column) {
    return {
      ...record,
      format: column.format,
      value: this._getValue(record, column.key)
    }
  }

  _getRow(record) {
    return {
      className: this._getRowClass(record),
      ref: node => this.row = node,
      style: this._getRowStyle()
    }
  }

  _getRowClass(record) {
    const { rowClass, onClick } = this.props
    let classes = ['maha-table-row']
    if(onClick) classes.push('maha-table-link')
    if(rowClass && _.isString(rowClass)) classes.push(rowClass)
    if(rowClass && _.isFunction(rowClass)) classes.push(rowClass(record))
    return classes.join(' ')
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

  _getValue(record, key) {
    if(typeof key === 'function') {
      return key(record)
    } else if(typeof key === 'string') {
      return _.get(record, key)
    } else {
      return ''
    }
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

export default Row
