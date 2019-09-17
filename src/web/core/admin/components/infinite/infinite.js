import { Appending, Empty, Failure, NotFound } from './results'
import Scrollpane from '../scrollpane'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Loader from '../loader'
import React from 'react'
import _ from 'lodash'

class Infinite extends React.Component {

  static propTypes = {
    all: PropTypes.number,
    cacheKey: PropTypes.string,
    endpoint: PropTypes.any,
    empty: PropTypes.any,
    exclude_ids: PropTypes.any,
    failure: PropTypes.any,
    filter: PropTypes.object,
    header: PropTypes.any,
    layout: PropTypes.any,
    next: PropTypes.string,
    notFound: PropTypes.any,
    props: PropTypes.object,
    records: PropTypes.array,
    selectAll: PropTypes.bool,
    selected: PropTypes.array,
    skip: PropTypes.number,
    sort: PropTypes.object,
    status: PropTypes.string,
    total: PropTypes.number,
    onFetch: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func,
    onUpdateSelected: PropTypes.func
  }

  static defaultProps = {
    cacheKey: null,
    empty: Empty,
    failure: Failure,
    filter: {},
    header: null,
    loading: Loader,
    notFound: NotFound,
    props: {},
    sort: {
      key: null,
      order: null
    },
    onUpdateSelected: (ids) => {}
  }

  render() {
    const { all, empty, failure, header, next, notFound, records, skip, status, total } = this.props
    const Layout = this.props.layout
    return (
      <div className="maha-infinite">
        { status === 'loading' && records && records.length > 0 && <Appending/> }
        { header &&
          <div className="maha-infinite-header">
            { React.createElement(header, this.props) }
          </div>
        }
        { status === 'loading' && !records && <Loader /> }
        { status === 'failed' && this._getComponent(failure) }
        { status !== 'failed' && records.length === 0 && skip === undefined && total === 0 && all !== 0 && this._getComponent(notFound) }
        { status !== 'failed' && records.length === 0 && skip === undefined && total === 0 && all === 0 && this._getComponent(empty) }
        { status !== 'failed' && records.length === 0 && all === undefined && skip === 0 && next === null && this._getComponent(empty) }
        { status !== 'failed' && records && records.length > 0 && Layout &&
          <Scrollpane { ...this._getScrollpane() }>
            <Layout { ...this._getLayout() } />
          </Scrollpane>
        }
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch(0, true)
  }

  componentDidUpdate(prevProps) {
    const { cacheKey, exclude_ids, filter, records, selected, sort, onUpdateSelected } = this.props
    if(cacheKey !== prevProps.cacheKey || !_.isEqual(prevProps.exclude_ids, exclude_ids)  || !_.isEqual(prevProps.filter, filter) || !_.isEqual(prevProps.sort, sort)) {
      this._handleFetch(0, true)
    }
    if(selected !== prevProps.selected && selected && records) {
      const selectedRecords = records.filter(record => _.includes(selected, record.id))
      if(onUpdateSelected) onUpdateSelected(selectedRecords)
    }
  }

  _getComponent(component) {
    return _.isFunction(component) ? React.createElement(component, this.props) : component
  }

  _getLayout() {
    const { all, props, records, selected, selectAll, total, onSelect, onSelectAll } = this.props
    return { all, records, selected, selectAll, total, onSelect, onSelectAll, ...props }
  }

  _getScrollpane() {
    return {
      onReachBottom: this._handleFetch.bind(this)
    }
  }

  _handleFetch(skip = null, reload = false) {
    const { endpoint, exclude_ids, filter, next, records, sort, total, onFetch } = this.props
    const loaded = records ? records.length : 0
    if(!onFetch || !this._getMore(next, skip, reload, loaded, total)) return
    onFetch(endpoint, {
      $page: this._getPagination(skip),
      ...(filter ? { $filter: filter } : {}),
      ...(sort && sort.key ? { $sort: (sort.order === 'desc' ? '-' : '') + sort.key } : {}),
      ...(exclude_ids ? { $exclude_ids: exclude_ids } : {})
    })
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

}

const mapStateToProps = (state, props) => props.selectors ? Object.keys(props.selectors).reduce((mapped, key) => ({
  ...mapped,
  [key]: props.selectors[key](state, props)
}), {}) : {}

export default connect(mapStateToProps)(Infinite)
