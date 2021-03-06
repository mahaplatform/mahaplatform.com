import { Appending } from './results'
import Scrollpane from '../scrollpane'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Message from '../message'
import Loader from '../loader'
import React from 'react'
import _ from 'lodash'

class Infinite extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    all: PropTypes.number,
    cacheKey: PropTypes.string,
    endpoint: PropTypes.any,
    empty: PropTypes.any,
    exclude_ids: PropTypes.any,
    failure: PropTypes.any,
    filter: PropTypes.object,
    footer: PropTypes.any,
    header: PropTypes.any,
    layout: PropTypes.any,
    next: PropTypes.string,
    notFound: PropTypes.any,
    props: PropTypes.object,
    query: PropTypes.object,
    records: PropTypes.array,
    reference: PropTypes.func,
    refresh: PropTypes.string,
    scrollpane: PropTypes.bool,
    selected: PropTypes.object,
    selectAll: PropTypes.bool,
    selectMode: PropTypes.string,
    selectValue: PropTypes.string,
    selectedValues: PropTypes.array,
    skip: PropTypes.number,
    sort: PropTypes.object,
    status: PropTypes.string,
    total: PropTypes.number,
    onClearSelection: PropTypes.func,
    onFetch: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onUpdateSelected: PropTypes.func
  }

  static defaultProps = {
    cacheKey: null,
    empty: {
      icon: 'times',
      title: 'No records',
      text: 'There are no records'
    },
    failure: {
      icon: 'exclamation-triangle ',
      title: 'Unable to load records',
      text: 'There was a problem with fetching your data'
    },
    filter: {},
    header: null,
    loading: Loader,
    notFound: {
      icon: 'times',
      title: 'No Results Found',
      text: 'No records matched your query'
    },
    props: {},
    scrollpane: true,
    selectValue: 'id',
    sort: {
      key: null,
      order: null
    },
    onUpdateSelected: (ids) => {}
  }

  _handleClearSelection = this._handleClearSelection.bind(this)
  _handleReload = this._handleReload.bind(this)

  render() {
    const { all, empty, failure, footer, header, next, notFound, records, scrollpane, skip, status, total } = this.props
    const Layout = this.props.layout
    return (
      <div className="maha-infinite">
        { status !== 'failed' && records && records.length > 0 && header &&
          <div className="maha-infinite-header">
            { React.createElement(header, this.props) }
          </div>
        }
        <div className="maha-infinite-body">
          { status === 'loading' && records && records.length > 0 && <Appending/> }
          { status === 'failed' && this._getComponent(failure) }
          { status === 'loading' && records.length === 0 && <Loader /> }
          { !_.includes(['loading','failed'], status) && records.length === 0 && skip === undefined && total === 0 && all !== 0 &&
            this._getComponent(notFound)
          }
          { !_.includes(['loading','failed'], status) && records.length === 0 && skip === undefined && total === 0 && all === 0 &&
            this._getComponent(empty)
          }
          { !_.includes(['loading','failed'], status) && records.length === 0 && all === undefined && skip === 0 && next === null &&
            this._getComponent(failure)
          }
          { status !== 'failed' && records && records.length > 0 && scrollpane && Layout &&
            <Scrollpane { ...this._getScrollpane() }>
              <Layout { ...this._getLayout() } />
            </Scrollpane>
          }
          { status !== 'failed' && records && records.length > 0 && !scrollpane && Layout &&
            <Layout { ...this._getLayout() } />
          }
        </div>
        { status !== 'failed' && records && records.length > 0 && footer &&
          <div className="maha-infinite-footer">
            { React.createElement(footer, this.props) }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { reference, refresh } = this.props
    if(refresh) this._handleJoin()
    if(reference) reference({
      clearSelection: this._handleClearSelection
    })
    this._handleFetch(0, true)
  }

  componentDidUpdate(prevProps) {
    const { cacheKey, endpoint, exclude_ids, filter, query, records, selectedValues, sort, onUpdateSelected } = this.props
    if(cacheKey !== prevProps.cacheKey || !_.isEqual(prevProps.exclude_ids, exclude_ids) || !_.isEqual(prevProps.endpoint, endpoint) || !_.isEqual(prevProps.filter, filter) || !_.isEqual(prevProps.query, query) || !_.isEqual(prevProps.sort, sort)) {
      this._handleFetch(0, true)
    }
    if(selectedValues !== prevProps.selectedValues && selectedValues && records) {
      if(onUpdateSelected) this._handleUpdateSelected()
    }
  }

  componentWillUnmount() {
    const { refresh } = this.props
    if(refresh) this._handleLeave()
  }

  _getComponent(component) {
    if(component.text) return <Message { ...component } />
    return _.isFunction(component) ? React.createElement(component, this.props) : component
  }

  _getLayout() {
    const { all, records, selected, selectAll, selectValue, total, onSelect, onSelectAll } = this.props
    return {
      all,
      records,
      selected,
      selectAll,
      selectValue,
      total,
      onReachBottom: this._handleFetch.bind(this),
      onSelect,
      onSelectAll,
      ...this._getProps()
    }
  }

  _getProps() {
    const { props } = this.props
    if(_.isFunction(props)) return props()
    if(_.isPlainObject(props)) return props
    return {}
  }

  _handleFetch(skip = null, reload = false) {
    const { endpoint, exclude_ids, filter, next, query, records, sort, total, onFetch } = this.props
    const loaded = records ? records.length : 0
    if(!onFetch || !this._getMore(next, skip, reload, loaded, total)) return
    onFetch(endpoint, {
      $page: this._getPagination(skip),
      ...query || {},
      ...(filter ? { $filter: filter } : {}),
      ...(sort && sort.key ? { $sort: (sort.order === 'desc' ? '-' : '') + sort.key } : {}),
      ...(exclude_ids ? { $exclude_ids: exclude_ids } : {})
    })
  }

  _handleJoin() {
    const { network } = this.context
    const { refresh } = this.props
    network.join(refresh)
    network.subscribe([
      { target: refresh, action: 'refresh', handler: this._handleReload }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { refresh } = this.props
    network.leave(refresh)
    network.unsubscribe([
      { target: refresh, action: 'refresh', handler: this._handleReload }
    ])
  }

  _getMore(next, skip, reload, loaded, total) {
    if(reload) return true
    if(next !== undefined) return next !== null
    if(total === undefined && skip === 0) return true
    if(total !== undefined) return loaded < total
  }

  _getPagination(skip) {
    const { next, records } = this.props
    const loaded = records ? records.length : 0
    if(next) return { next }
    return { skip: skip !== null ? skip : loaded }
  }

  _getScrollpane() {
    return {
      onReachBottom: this._handleFetch.bind(this)
    }
  }

  _handleClearSelection() {
    this.props.onClearSelection()
  }

  _handleReload() {
    this._handleFetch(0, true)
  }

  _handleUpdateSelected() {
    const { selected } = this.props
    this.props.onUpdateSelected(selected)
  }

}

const mapStateToProps = (state, props) => props.selectors ? Object.keys(props.selectors).reduce((mapped, key) => ({
  ...mapped,
  [key]: props.selectors[key](state, props)
}), {}) : {}

export default connect(mapStateToProps)(Infinite)
