import PropTypes from 'prop-types'
import Format from '../../format'
import React from 'react'
import _ from 'lodash'

class Row extends React.Component {

  static propTypes = {
    data: PropTypes.object,
    index: PropTypes.number,
    style: PropTypes.object
  }

  row = null

  _handleClick= this._handleClick.bind(this)
  _handleSetHeight = this._handleSetHeight.bind(this)

  constructor(props) {
    super(props)
    const { data, index } = props
    this.state = {
      height: data.heights[index]
    }
  }

  render() {
    const { data, index } = this.props
    const { columns, records, selectable, onClick } = data
    const record = records[index]
    return (
      <div { ...this._getRow(record, index) }>
        { selectable &&
          <div key={`cell_${index}_select`} className="maha-table-check-cell" onClick={ this._handleSelect.bind(this, record) }>
            <i className={`fa fa-${ this._getChecked(record) }`} />
          </div>
        }
        { columns.map((column, cindex) => (
          <div key={`column_${cindex}`} { ...this._getCell(column, cindex) }>
            <Format { ...this._getFormat(record, column) } />
          </div>
        ))}
        <div className="maha-table-cell icon mobile collapsing centered">
          { onClick && <i className="fa fa-chevron-right" /> }
        </div>
      </div>
    )
  }

  componentDidMount() {
    if(this.state.height) return
    setTimeout(this._handleSetHeight, 25)
  }

  componentDidUpdate(prevProps) {
    const { data, index } = this.props
    if(data.widths[index] !== prevProps.data.widths[index]) {
      this._handleSetHeight()
    }
  }

  _getCell(column, cindex) {
    return {
      className: this._getCellClass(column),
      style: this._getCellStyle(cindex)
    }
  }

  _getCellClass(column) {
    let classes = ['maha-table-cell']
    if(column.primary === true) classes.push('mobile')
    if(column.format === 'check' || column.collapsing === true) classes.push('collapsing')
    if(column.format === 'check' || column.centered === true) classes.push('centered')
    if(column.format === 'currency') classes.push('right')
    if(column.align) classes.push(column.align)
    if(!_.isFunction(column.format) && !_.isElement(column.format)) classes.push('padded')
    return classes.join(' ')
  }

  _getCellStyle(index) {
    const { data } = this.props
    return data.widths[index]
  }

  _getChecked(record) {
    const { data } = this.props
    const { selected, selectValue } = data
    const value = _.get(record, selectValue)
    const included = _.includes(selected.values, value)
    if(selected.mode === '$in') return included ? 'check-circle' : 'circle-o'
    return included ? 'circle-o' : 'check-circle'
  }

  _getFormat(record, column) {
    return {
      ...record,
      format: column.format,
      value: this._getValue(record, column.key)
    }
  }

  _getRow(record, index) {
    return {
      className: this._getRowClass(record),
      ref: node => this.row = node,
      style: this._getRowStyle(),
      onClick: this._handleClick.bind(this, record, index)
    }
  }

  _getRowClass(record) {
    const { data } = this.props
    const { rowClass, onClick } = data
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

  _getValue(record, key) {
    if(typeof key === 'function') {
      return key(record)
    } else if(typeof key === 'string') {
      return _.get(record, key)
    } else {
      return ''
    }
  }

  _handleClick(record, index) {
    const { data } = this.props
    if(!data.onClick) return
    data.onClick(record, index)
  }

  _handleSelect(record, e) {
    e.stopPropagation()
    const { data } = this.props
    const { selectValue, onSelect } = data
    const value = _.get(record, selectValue)
    onSelect(value)
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
