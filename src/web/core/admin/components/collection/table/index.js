import Format from '../../format'
import PropTypes from 'prop-types'
import _ from 'lodash'
import React from 'react'

class Table extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    columns: PropTypes.array,
    handler: PropTypes.func,
    link: PropTypes.func,
    modal: PropTypes.any,
    records: PropTypes.array,
    recordTasks: PropTypes.func,
    rowClass: PropTypes.func,
    selectable: PropTypes.bool,
    selected: PropTypes.array,
    selectAll: PropTypes.bool,
    sort: PropTypes.object,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSort: PropTypes.func
  }

  static defaultProps = {
    onSelect: (id) => {},
    onSelectAll: () => {}
  }

  state = {
    columns: [],
    config: false
  }

  _handleToggleConfig = this._handleToggleConfig.bind(this)
  _handleSelectAll = this._handleSelectAll.bind(this)

  render(){
    const { link, records, recordTasks, selectable, selected, selectAll, sort } = this.props
    const { columns, config } = this.state
    return (
      <div className="maha-table">
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
              <td className="maha-table-head-cell mobile config" onClick={ this._handleToggleConfig }>
                <i className="fa fa-chevron-down" />
                { config &&
                  <div className="maha-table-columns" onMouseLeave={ this._handleToggleConfig }>
                    { columns.map((column, index) => (
                      <div className="maha-table-column" key={`column_${index}`} onClick={ this._handleToggleColumn.bind(this, column) }>
                        <div className="maha-table-column-label">
                          { column.label }
                        </div>
                        <div className="maha-table-column-icon">
                          { column.visible && !column.primary && <i className="fa fa-fw fa-check" /> }
                          { column.primary && <i className="fa fa-fw fa-lock" /> }
                        </div>
                      </div>
                    ))}
                  </div>
                }
              </td>
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
      </div>
    )
  }

  componentDidMount() {
    const { columns } = this.props
    this.setState({
      columns: columns.map(column => ({
        ...column,
        visible: column.primary === true || column.visible !== false
      }))
    })
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
    this.context.router.push(path)
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

  _handleToggleConfig(e) {
    const { config } = this.state
    this.setState({
      config: !config
    })
  }

  _handleToggleColumn(c, e) {
    const { columns } = this.state
    this.setState({
      columns: columns.map(column => ({
        ...column,
        visible: (column.key === c.key && column.primary !== true) ? !column.visible : column.visible
      }))
    })
    e.stopPropagation()
  }

}

export default Table
