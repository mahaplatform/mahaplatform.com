import { CSSTransition } from 'react-transition-group'
import { Empty, Results } from './results'
import { connect } from 'react-redux'
import Infinite from '../infinite'
import PropTypes from 'prop-types'
import Filter from '../filter'
import Filters from './filters'
import Buttons from '../buttons'
import Header from './header'
import React from 'react'
import _ from 'lodash'
import qs from 'qs'

class Collection extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    buttons: PropTypes.any,
    cacheKey: PropTypes.string,
    criteria: PropTypes.array,
    data: PropTypes.array,
    defaultSort: PropTypes.object,
    endpoint: PropTypes.string,
    entity: PropTypes.string,
    empty: PropTypes.any,
    export: PropTypes.array,
    failure: PropTypes.any,
    filter: PropTypes.object,
    filtering: PropTypes.bool,
    filters: PropTypes.array,
    footer: PropTypes.bool,
    handler: PropTypes.func,
    icon: PropTypes.string,
    layout: PropTypes.func,
    loading: PropTypes.any,
    link: PropTypes.func,
    modal: PropTypes.string,
    new: PropTypes.func,
    open: PropTypes.bool,
    panel: PropTypes.any,
    q: PropTypes.string,
    records: PropTypes.array,
    recordTasks: PropTypes.func,
    route: PropTypes.object,
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
    onSetFilter: PropTypes.func,
    onSetParams: PropTypes.func,
    onSetQuery: PropTypes.func,
    onSetSelected: PropTypes.func,
    onSetRecords: PropTypes.func,
    onToggleFilter: PropTypes.func
  }

  static defaultProps = {
    cacheKey: null,
    entity: 'record',
    footer: true,
    search: true,
    selectable: false
  }

  state = {
    cacheKey: _.random(100000, 999999).toString(36)
  }

  _handleRefresh = this._handleRefresh.bind(this)

  render() {
    const { buttons, criteria, endpoint, filters, filtering, records, selected } = this.props
    return (
      <div className="maha-collection">
        <Header { ...this._getHeader() } />
        <div className="maha-collection-main">
          { filtering &&
            <div className="maha-collection-sidebar">
              { filters && !criteria && <Filters { ...this._getFilters() } /> }
              { criteria && <Filter { ...this._getFilter() } /> }
            </div>
          }
          <div className="maha-collection-body">
            { records && <Results { ...this._getResults() } /> }
            { endpoint && <Infinite { ...this._getInfinite() } /> }
          </div>
        </div>
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
    )
  }

  componentDidMount() {
    const { data, onSetRecords } = this.props
    if(data) onSetRecords(data)
    this._handleParseUrl()
  }

  componentDidUpdate(prevProps) {
    const { cacheKey, filter, sort } = this.props
    if(cacheKey !== prevProps.cacheKey) {
      this._handleRefresh()
    }
    if(!_.isEqual(filter, prevProps.filter)) {
      this._handleChangeUrl()
    }
    if(!_.isEqual(sort, prevProps.sort)) {
      this._handleChangeUrl()
    }
  }

  _getFilters() {
    const { entity, filters, filter, onRemovePanel, onSetFilter } = this.props
    const article = _.includes(['a','e','i','o'], entity[0]) ? 'an' : 'a'
    return {
      filters,
      values: filter,
      prompt: `Find ${article} ${entity}`,
      onUpdate: onSetFilter,
      onDone: onRemovePanel
    }
  }

  _getFilter() {
    const { criteria, entity, filter, onSetFilter } = this.props
    return {
      code: 'foobarbaz',
      entity,
      defaultValue: Object.keys(filter).length > 0 ? filter : null,
      fields: criteria,
      onChange: onSetFilter
    }
  }

  _getHeader() {
    const { endpoint, entity, filter, filters, filtering, search, sort, tasks, onSetQuery, onToggleFilter } = this.props
    return {
      endpoint,
      entity,
      export: this.props.export,
      filter,
      filters,
      filtering,
      search,
      sort,
      tasks,
      onSetQuery,
      onToggleFilter,
      onRefresh: this._handleRefresh
    }
  }

  _getButtons() {
    if(!this.props.buttons) return { buttons: null }
    return {
      buttons: this.props.buttons(this.props)
    }
  }

  _getResults() {
    return {
      ...this.props
    }
  }

  _getInfinite() {
    const { endpoint, failure, loading, q, sort, onSetSelected } = this.props
    const { cacheKey } = this.state
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

  _getSanitizedFilter(filter) {
    if(Object.keys(filter)[0] === '$and') return filter
    return _.isArray(filter) ? { $and: filter} : { $and: [filter] }
  }

  _getSanitizedSort(sort) {
    if(!_.isString(sort)) return sort
    return {
      key: sort.replace(/^-/, ''),
      order: sort[0] === '-' ? 'desc' : 'asc'
    }
  }

  _handleAddNew() {
    this.context.modal.open(this.props.empty.modal)
  }

  _handleChangeUrl() {
    const { pathname } = this.props.route
    const { key, order } = this.props.sort
    const { history } = this.context.router
    const $filter = this.props.filter
    const $sort = order === 'desc' ? `-${key}` : key
    const query = qs.stringify({ $filter, $sort }, { encode: false, skipNulls: true })
    history.replace(`${pathname}?${query}`)
  }

  _handleParseUrl() {
    const { search } = this.props.route
    const { defaultSort, onSetParams } = this.props
    const decoder = (str) => str.match(/^\d$/) !== null ? parseInt(str) : str
    const query = search.length > 0 ? qs.parse(search.slice(1), { decoder }) : {}
    const filter =  this._getSanitizedFilter(query.$filter || { $and: [] })
    const sort = this._getSanitizedSort(query.$sort || defaultSort || { key: 'created_at', order: 'desc' })
    onSetParams(filter, sort)
  }

  _handleRefresh() {
    this.setState({
      cacheKey: _.random(100000, 999999).toString(36)
    })
  }

}

const mapStateToProps = (state, props) => ({
  route: state.maha.router.history.slice(-1)[0]
})

export default connect(mapStateToProps)(Collection)
