import elementResizeEvent from 'element-resize-event'
import PropTypes from 'prop-types'
import Format from '../../format'
import Columns from './columns'
import React from 'react'
import _ from 'lodash'

class Table extends React.Component {

  static contextTypes = {
    tasks: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    columns: PropTypes.array,
    defaults: PropTypes.array,
    display: PropTypes.array,
    hidden: PropTypes.array,
    records: PropTypes.array,
    recordTasks: PropTypes.func,
    rowClass: PropTypes.func,
    selectable: PropTypes.bool,
    selected: PropTypes.object,
    selectAll: PropTypes.bool,
    selectValue: PropTypes.string,
    sort: PropTypes.object,
    status: PropTypes.string,
    total: PropTypes.number,
    visible: PropTypes.array,
    onClick: PropTypes.func,
    onLoadHidden: PropTypes.func,
    onReachBottom: PropTypes.func,
    onSaveHidden: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSort: PropTypes.func,
    onToggleHidden: PropTypes.func
  }

  body = null
  header = null
  notified = false
  panel = null
  window = null

  state = {
    averageHeight: 42,
    bodyHeight: [],
    bodyDimensions: [],
    firstIndex: 0,
    headerDimensions: [],
    panelHeight: 0,
    rows: 30,
    windowHeight: 0
  }

  _handleInit = this._handleInit.bind(this)
  _handleResize = _.throttle(this._handleResize.bind(this), 250)
  _handleScroll = _.throttle(this._handleScroll.bind(this), 100)
  _handleSelectAll = this._handleSelectAll.bind(this)

  _getTableClass() {
    const { status } = this.props
    const classes = ['maha-collection-table']
    if(status === 'loading') classes.push('loading')
    return classes.join(' ')
  }

  render() {
    const { records, recordTasks, selectable, selectAll, visible, onClick } = this.props
    return (
      <div className={ this._getTableClass() }>
        <div className="maha-collection-table-header">
          <table ref={ node => this.header = node }>
            <tbody>
              <tr>
                { selectable &&
                  <td { ...this._getSelectAll() }>
                    { selectAll ? <i className="fa fa-check-circle" /> : <i className="fa fa-circle-o" /> }
                  </td>
                }
                { visible.map((column, cindex) => (
                  <td key={`header_${cindex}`} { ...this._getHeader(column, cindex) }>
                    { column.label }
                    { this._getSort(column) }
                  </td>
                ))}
                { recordTasks &&
                  <td className="mobile config" />
                }
                <Columns { ...this._getColumns() } />
              </tr>
            </tbody>
          </table>
        </div>
        <div { ...this._getWindow() }>
          <div { ...this._getPanel() }>
            <table ref={ node => this.body = node }>
              <tbody>
                { records.map((record, rindex) => (
                  <tr key={`row_${rindex}`} { ...this._getRow(record, rindex) }>
                    { selectable &&
                      <td key={`row_${rindex}_select`} { ...this._getSelect(record) }>
                        <i className={`fa fa-${ this._getChecked(record) }`} />
                      </td>
                    }
                    { visible.map((column, cindex) => (
                      <td key={`row_${rindex}_column_${cindex}`} { ...this._getCell(column, rindex, cindex) }>
                        { record ? <Format { ...this._getFormat(record, column) } /> : null }
                      </td>
                    ))}
                    { recordTasks &&
                      <td className="icon mobile centered" onClick={ this._handleTasks.bind(this, record) }>
                        <i className="fa fa-ellipsis-v" />
                      </td>
                    }
                    <td className="padded icon mobile centered">
                      { onClick && <i className="fa fa-chevron-right" /> }
                    </td>
                  </tr>
                )) }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaults, code } = this.props
    elementResizeEvent(this.body, this._handleResize)
    this.props.onLoadHidden(code, defaults)
  }

  componentDidUpdate(prevProps) {
    const { code, hidden, records, status, visible } = this.props
    if(status !== prevProps.status && status === 'success') {
      this._handleInit()
    }
    if(!_.isEqual(hidden, prevProps.hidden)) {
      this.props.onSaveHidden(code, hidden)
    }
    if(!_.isEqual(visible, prevProps.visible)) {
      this._handleResize()
    }
    if(!_.isEqual(records, prevProps.records)) {
      this._handleResize()
      this.notified = false
    }
  }

  _getCell(column, rindex, cindex) {
    return {
      className: this._getCellClass(column),
      style: this._getCellStyle(rindex, cindex)
    }
  }

  _getCellClass(column) {
    const classes = ['maha-collection-table-cell']
    if(column.primary === true) classes.push('mobile')
    if(_.includes(['check','check_times'], column.format) || column.centered === true) classes.push('center')
    if(column.collapsing) classes.push('collapsing')
    if(_.includes(['date','datetime'], column.format)) classes.push('collapsing datetime')
    if(_.includes(['currency','percent','rate'], column.format)) classes.push('right')
    if(column.align) classes.push(column.align)
    if(column.padded || (!_.isFunction(column.format) && !_.isElement(column.format))) classes.push('padded')
    return classes.join(' ')
  }

  _getCellStyle(rindex, cindex) {
    const { headerDimensions } = this.state
    const { selectable } = this.props
    if(rindex > 0) return {}
    const index = cindex + (selectable ?  1 : 0)
    return {
      minWidth: headerDimensions[index] ? headerDimensions[index].w : null
    }
  }

  _getChecked(record) {
    const { selected, selectValue } = this.props
    const value = _.get(record, selectValue)
    const included = _.includes(selected.values, value)
    if(selected.mode === '$in') return included ? 'check-circle' : 'circle-o'
    return included ? 'circle-o' : 'check-circle'
  }

  _getColumns() {
    const { display, onToggleHidden } = this.props
    return {
      columns: display,
      onToggleHidden
    }
  }

  _getFormat(record, column) {
    return {
      ...record,
      format: column.format,
      value: this._getValue(record, column.key)
    }
  }

  _getHeader(column, cindex) {
    return {
      className: this._getHeaderClass(column),
      style: this._getHeaderStyle(cindex),
      onClick: this._handleSort.bind(this, column)
    }
  }

  _getHeaderClass(column) {
    let classes = ['maha-collection-table-cell','padded']
    if(column.primary === true) classes.push('mobile')
    if(_.includes(['date','datetime'], column.format)) classes.push('collapsing datetime')
    if(_.includes(['check','check_times'], column.format)) classes.push('collapsing')
    if(column.collapsing === true) classes.push('collapsing')
    return classes.join(' ')
  }

  _getHeaderStyle(cindex) {
    const { bodyDimensions } = this.state
    const { selectable } = this.props
    const index = cindex + (selectable ?  1 : 0)
    return {
      width: bodyDimensions[index] ? bodyDimensions[index].w : null
    }
  }

  _getPanel() {
    return {
      ref: node => this.panel = node
    }
  }

  _getRow(record, rindex) {
    return {
      className: this._getRowClass(record),
      onClick: this._handleClick.bind(this, record, rindex)
    }
  }

  _getRowClass(record) {
    const { rowClass, onClick  } = this.props
    let classes = []
    if(onClick) classes.push('maha-collection-table-link')
    if(rowClass && _.isString(rowClass)) classes.push(rowClass)
    if(rowClass && _.isFunction(rowClass)) classes.push(rowClass(record))
    return classes.join(' ')
  }

  _getSelect(record) {
    return {
      className: 'maha-collection-table-check-cell',
      onClick: this._handleSelect.bind(this, record)
    }
  }

  _getSelectAll() {
    return {
      className: 'maha-collection-table-check-cell',
      style: this._getHeaderStyle(-1),
      onClick: this._handleSelectAll
    }
  }

  _getSort(column) {
    const { sort } = this.props
    if(!sort || (column.key !== sort.key && column.sort !== sort.key)) return null
    return sort.order === 'asc' ? <i className="fa fa-caret-up" /> : <i className="fa fa-caret-down" />
  }

  _getValue(record, key) {
    if(_.isFunction(key)) return key(record)
    if(_.isString(key)) return _.get(record, key)
    return ''
  }

  _getWindow() {
    return {
      className:'maha-collection-table-body',
      ref: node => this.window = node,
      onScroll: this._handleScroll
    }
  }

  _handleClick(record, index) {
    const { onClick } = this.props
    if(onClick) onClick(record, index)
  }

  _handleInit() {
    const windowHeight = window.getComputedStyle(this.window).height
    this.setState({
      headerDimensions: this._handleMeasure(this.header),
      windowHeight: parseInt(windowHeight.replace('px', ''))
    })
    this._handleResize()
  }

  _handleMeasure(element) {
    const cells = element.childNodes[0].childNodes[0].childNodes
    return Array.prototype.slice.call(cells).map(cell => ({
      w: cell.offsetWidth,
      h: cell.offsetHeight
    }))
  }

  _handleResize() {
    this.setState({
      bodyDimensions: this._handleMeasure(this.body)
    })
  }

  _handleScroll() {
    const panelHeight = parseInt(window.getComputedStyle(this.panel).height.replace('px', ''))
    const { windowHeight } = this.state
    const { scrollTop } = this.window
    const percentScrolled = (scrollTop / (panelHeight - windowHeight)) * 100
    if(!this.notified && percentScrolled > 60) {
      this.props.onReachBottom()
      this.notified = true
    }
    this._handleResize()
  }

  _handleSelect(record, e) {
    e.stopPropagation()
    const { selectValue } = this.props
    const value = _.get(record, selectValue)
    this.props.onSelect(value)
  }

  _handleSelectAll() {
    this.props.onSelectAll()
  }

  _handleSort(column) {
    const key = column.sort || column.key
    this.window.style.scrollBehavior = 'auto'
    this.window.scrollTop = 0
    this.window.style.scrollBehavior = 'smooth'
    this.props.onSort(key)
  }

  _handleTasks(record, e) {
    e.stopPropagation()
    const { recordTasks } = this.props
    this.context.tasks.open({
      items: recordTasks(record)
    })
  }

}

export default Table
