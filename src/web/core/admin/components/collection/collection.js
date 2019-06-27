import { CSSTransition } from 'react-transition-group'
import { Empty, Results } from './results'
import Infinite from '../infinite'
import PropTypes from 'prop-types'
import Buttons from '../buttons'
import Header from './header'
import Tasks from './tasks'
import React from 'react'
import _ from 'lodash'
import qs from 'qs'

class Collection extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    buttons: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.array
    ]),
    cacheKey: PropTypes.string,
    columns: PropTypes.array,
    data: PropTypes.array,
    defaultSort: PropTypes.object,
    endpoint: PropTypes.string,
    entity: PropTypes.string,
    empty: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element,
      PropTypes.string
    ]),
    export: PropTypes.array,
    failure: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element
    ]),
    filter: PropTypes.object,
    filters: PropTypes.array,
    footer: PropTypes.bool,
    handler: PropTypes.func,
    icon: PropTypes.string,
    layout: PropTypes.func,
    loading: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.element
    ]),
    link: PropTypes.func,
    managing: PropTypes.bool,
    modal: PropTypes.string,
    new: PropTypes.func,
    open: PropTypes.bool,
    panel: PropTypes.any,
    q: PropTypes.string,
    records: PropTypes.array,
    recordTasks: PropTypes.func,
    rowClass: PropTypes.func,
    search: PropTypes.bool,
    selected: PropTypes.array,
    selectable: PropTypes.bool,
    sort: PropTypes.object,
    table: PropTypes.array,
    tasks: PropTypes.array,
    token: PropTypes.string,
    onAddPanel: PropTypes.func,
    onClearPanel: PropTypes.func,
    onFetch: PropTypes.func,
    onRemovePanel: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSetColumns: PropTypes.func,
    onSetFilter: PropTypes.func,
    onSetParams: PropTypes.func,
    onSetQuery: PropTypes.func,
    onSetSelected: PropTypes.func,
    onSetRecords: PropTypes.func,
    onToggleTasks: PropTypes.func
  }

  static defaultProps = {
    cacheKey: null,
    entity: 'record',
    footer: true,
    search: true,
    selectable: false
  }

  render() {
    const { buttons, endpoint, records, selected } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="maha-collection-canvas" onClick={ this._handleToggleTasks.bind(this) } />
        <Tasks { ...this._getTasks() } />
        <div className="maha-collection-body">
          <Header { ...this._getHeader() } />
          { records && <Results { ...this._getResults() } /> }
          { endpoint && <Infinite { ...this._getInfinite() } /> }
          { buttons &&
            <CSSTransition in={ selected.length > 0 } classNames="expanded" timeout={ 100 } mountOnEnter={ true } unmountOnExit={ true }>
              <div className="maha-collection-footer">
                <div className="maha-collection-footer-count">
                  <i className="fa fa-fw fa-chevron-up" />
                  <div className="count">
                    { selected.length }
                  </div>
                </div>
                <div className="maha-collection-footer-buttons">
                  <Buttons { ...this._getButtons() } />
                </div>
              </div>
            </CSSTransition>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { data, defaultSort, table, onSetParams, onSetColumns, onSetRecords } = this.props
    const filter = this._getFilterFromUrl() || this.props.filter || {}
    const sort = defaultSort || { key: 'created_at', order: 'desc' }
    onSetParams(filter, sort)
    if(table) onSetColumns(table)
    if(data) onSetRecords(data)
  }

  componentDidUpdate(prevProps) {
    const { filter } = this.props
    const { router } = this.context
    if(!_.isEqual(filter, prevProps.filter)) {
      const query = qs.stringify({ $filter: filter }, { encode: false })
      router.replace(router.pathname+'?'+query)
    }
  }

  _getFilterFromUrl() {
    const { search } = this.context.router
    if(_.isEmpty(search)) return null
    const query = qs.parse(search.replace('?',''))
    if(!query.$filter) return null
    return query.$filter
  }

  _getClass() {
    const classes = ['maha-collection']
    if(this.props.managing) classes.push('managing')
    return classes.join(' ')
  }

  _getHeader() {
    const { filter, filters, managing, search, tasks, onSetQuery, onToggleTasks } = this.props
    return {
      export: this.props.export,
      filter,
      filters,
      managing,
      search,
      tasks,
      onSetQuery,
      onToggleTasks
    }
  }

  _getButtons() {
    if(!this.props.buttons) return { buttons: null }
    return {
      buttons: this.props.buttons(this.props)
    }
  }

  _getTasks() {
    return this.props
  }

  _getResults() {
    return {
      ...this.props
    }
  }

  _getInfinite() {
    const { cacheKey, endpoint, failure, loading, q, sort, onSetSelected } = this.props
    const filter = {
      ...this.props.filter,
      q
    }
    return {
      cacheKey,
      endpoint,
      filter,
      loading,
      empty: this._getEmpty(),
      failure,
      layout: (props) => <Results { ...this.props } { ...props } />,
      sort,
      onUpdateSelected: onSetSelected
    }
  }

  _getEmpty() {
    const { empty } = this.props
    if(_.isFunction(empty)) return React.createElement(empty, this.props)
    return <Empty { ...this.props } />
  }

  _handleToggleTasks() {
    this.props.onToggleTasks()
  }

  _handleAddNew() {
    this.context.modal.open(this.props.empty.modal)
  }

}

export default Collection
