import PropTypes from 'prop-types'
import Columns from './columns'
import Loader from '../loader'
import Format from '../format'
import React from 'react'
import _ from 'lodash'

class Table extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    columns: PropTypes.array,
    defaults: PropTypes.array,
    display: PropTypes.array,
    handler: PropTypes.func,
    hidden: PropTypes.array,
    link: PropTypes.func,
    modal: PropTypes.any,
    records: PropTypes.array,
    recordTasks: PropTypes.func,
    rowClass: PropTypes.func,
    selectable: PropTypes.bool,
    selected: PropTypes.array,
    selectAll: PropTypes.bool,
    sort: PropTypes.object,
    status: PropTypes.string,
    onLoadHidden: PropTypes.func,
    onSaveHidden: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSort: PropTypes.func,
    onToggleHidden: PropTypes.func
  }

  static defaultProps = {
    onSelect: (id) => {},
    onSelectAll: () => {}
  }

  _handleSelectAll = this._handleSelectAll.bind(this)

  render() {
    const { link, records, recordTasks, selectable, selected, selectAll, sort, status } = this.props
    const columns = this.props.display
    return (
      <div className="maha-table">
        { status !== 'success' ?
          <div className="maha-table-loader">
            <Loader />
          </div> :
          <table className="maha-table-data">
            <thead>
              <tr>
                { selectable &&
                  <td className="maha-table-check-cell" onClick={ this._handleSelectAll }>
                    { selectAll ? <i className="fa fa-check-circle" /> : <i className="fa fa-circle-o" /> }
                  </td>
                }
                { columns.filter(column => column.visible !== false).map((column, columnIndex) => (
                  <td key={`header-${columnIndex}`} className={ this._getHeaderClass(column) } onClick={ this._handleSort.bind(this, column) }>
                    { column.label }
                    { sort && (column.key === sort.key || column.sort === sort.key) &&
                      (sort.order === 'asc' ? <i className="fa fa-caret-up" /> : <i className="fa fa-caret-down" />)
                    }
                  </td>
                ))}
                { recordTasks &&
                  <td className="maha-table-head-cell mobile collapsing next" />
                }
                <Columns { ...this._getColumns() } />
              </tr>
            </thead>
            <tbody>
              { records.map((record, rowIndex) => (
                <tr key={ `record_${rowIndex}` } className={ this._getBodyRowClass(record) }>
                  { selectable &&
                    <td key={`cell_${rowIndex}_select`} className="maha-table-check-cell" onClick={ this._handleSelect.bind(this, record.id) }>
                      { _.includes(selected, record.id) ? <i className="fa fa-check-circle" /> : <i className="fa fa-circle-o" /> }
                    </td>
                  }
                  { columns.filter(column => column.visible !== false).map((column, columnIndex) => (
                    <td key={ `cell_${rowIndex}_${columnIndex}` } className={ this._getBodyClass(column) } onClick={ this._handleClick.bind(this, record, rowIndex) }>
                      <Format { ...record } format={ column.format } value={ _.get(record, column.key) } />
                    </td>
                  )) }
                  { recordTasks &&
                    <td className="icon mobile collapsing centered" onClick={ this._handleTasks.bind(this, record) }>
                      <i className="fa fa-ellipsis-v" />
                    </td>
                  }
                  <td className="maha-table-body-cell icon mobile collapsing centered">
                    { link && <i className="fa fa-chevron-right" /> }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
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

  _getActions(record) {
    const { recordTasks } = this.props
    return {
      record,
      items: recordTasks(record)
    }
  }

  _getHeaderClass(column) {
    let classes = ['padded']
    if(column.primary === true) classes.push('mobile')
    if(column.format === 'check' || column.collapsing === true) classes.push('collapsing')
    return classes.join(' ')
  }

  _getBodyClass(column) {
    let classes = []
    if(column.primary === true) classes.push('mobile')
    if(column.format === 'check' || column.collapsing === true) classes.push('collapsing')
    if(column.format === 'check' || column.centered === true) classes.push('centered')
    if(column.format === 'currency') classes.push('right')
    if(!_.isFunction(column.format) && !_.isElement(column.format)) classes.push('padded')
    return classes.join(' ')
  }

  _getBodyRowClass(record) {
    const { link, modal, handler, rowClass } = this.props
    let classes = []
    if(link || modal || handler) classes.push('maha-table-link')
    if(rowClass && _.isString(rowClass)) classes.push(rowClass)
    if(rowClass && _.isFunction(rowClass)) classes.push(rowClass(record))
    return classes.join(' ')
  }

  _getColumns() {
    const { onToggleHidden } = this.props
    return {
      columns: this.props.display,
      onToggleHidden
    }
  }

  _handleClick(record, index) {
    const { link, modal, handler } = this.props
    if(link) return this._handleLink(record, index)
    if(modal) return this._handleModal(record, index)
    if(handler) return this._handleHandler(record, index)
  }

  _handleHandler(record, index) {
    this.props.handler(record, index)
  }

  _handleLink(record, index) {
    const { link } = this.props
    const path = link(record)
    this.context.router.history.push(path)
  }

  _handleModal(record, index) {
    this.context.model.open(() => <this.props.modal record={ record } index={ index } />)
  }

  _handleSelect(id) {
    this.props.onSelect(id)
  }

  _handleSelectAll() {
    this.props.onSelectAll()
  }

  _handleSort(column) {
    const key = column.sort || column.key
    this.props.onSort(key)
  }

  _handleTasks(record) {
    const { recordTasks } = this.props
    const tasks = recordTasks(record)
    this.context.tasks.open(tasks)
  }

}

export default Table
