import { CSSTransition } from 'react-transition-group'
import { Empty, Results } from './results'
import Infinite from '../infinite'
import PropTypes from 'prop-types'
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
    const { buttons, endpoint, filters, filtering, records, selected } = this.props
    return (
      <div className="maha-collection">
        { filters && filtering &&
          <div className="maha-collection-sidebar">
            <Filters { ...this._getFilter() } />
          </div>
        }
        <div className="maha-collection-main">
          <Header { ...this._getHeader() } />
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
    const { data, defaultSort, onSetParams, onSetRecords } = this.props
    const filter = this._getFilterFromUrl() || this.props.filter || {}
    const sort = defaultSort || { key: 'created_at', order: 'desc' }
    onSetParams(filter, sort)
    if(data) onSetRecords(data)
  }

  componentDidUpdate(prevProps) {
    const { cacheKey, filter } = this.props
    const { router } = this.context
    if(cacheKey !== prevProps.cacheKey) {
      this._handleRefresh()
    }
    if(!_.isEqual(filter, prevProps.filter)) {
      const query = qs.stringify({ $filter: filter }, { encode: false })
      router.replace(router.pathname+'?'+query)
    }
  }

  _getFilter() {
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

  _getFilterFromUrl() {
    const { search } = this.context.router
    if(_.isEmpty(search)) return null
    const query = qs.parse(search.replace('?',''))
    if(!query.$filter) return null
    return query.$filter
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

  _handleRefresh() {
    this.setState({
      cacheKey: _.random(100000, 999999).toString(36)
    })
  }

  _handleAddNew() {
    this.context.modal.open(this.props.empty.modal)
  }

}

export default Collection
