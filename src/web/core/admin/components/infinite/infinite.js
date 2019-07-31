import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import Scrollpane from '../scrollpane'
import Loader from '../loader'
import { Appending, Empty, Failure, NotFound } from './results'
import { connect } from 'react-redux'

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
    loading: PropTypes.any,
    next: PropTypes.string,
    notFound: PropTypes.any,
    records: PropTypes.array,
    selected: PropTypes.array,
    sort: PropTypes.object,
    status: PropTypes.string,
    total: PropTypes.number,
    onFetch: PropTypes.func,
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
    sort: {
      key: null,
      order: null
    },
    onUpdateSelected: (ids) => {}
  }

  render() {
    const { all, empty, failure, header, layout, loading, notFound, records, status, total } = this.props
    return (
      <div className="maha-infinite">
        { header &&
          <div className="maha-infinite-header">
            { React.createElement(header, this.props) }
          </div>
        }
        { status === 'loading' && !records && this._getComponent(loading) }
        { status === 'failed' && this._getComponent(failure) }
        { status !== 'failed' && total === 0 && all !== 0 && this._getComponent(notFound) }
        { status !== 'failed' && total === 0 && all === 0 && this._getComponent(empty) }
        { status !== 'failed' && records && records.length > 0 && layout &&
          <Scrollpane { ...this._getScrollpane() }>
            { React.createElement(layout, this.props) }
          </Scrollpane>
        }
        { status === 'loading' && records && records.length > 0 && this._getComponent(Appending) }
      </div>
    )
  }

  componentDidMount() {
    this._handleFetch(0, true)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const ignored = ['con','empty','layout','footer','router']
    return Object.keys(_.omit(this.props, ignored)).reduce((update, key) => {
      return update || !_.isEqual(this.props[key], nextProps[key])
    }, false)
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

  _getComponent(component){
    return _.isFunction(component) ? React.createElement(component, this.props) : component
  }

  _getScrollpane() {
    return {
      onReachBottom: this._handleFetch.bind(this)
    }
  }

  _handleFetch(skip = null, reload = false) {
    const { endpoint, exclude_ids, filter, next, records, sort, total, onFetch } = this.props
    const loaded = records ? records.length : 0
    const query = {
      $page: this._getPagination(skip),
      ...(filter ? { $filter: filter } : {}),
      ...(sort && sort.key ? { $sort: (sort.order === 'desc' ? '-' : '') + sort.key } : {}),
      ...(exclude_ids ? { $exclude_ids: exclude_ids } : {})
    }
    if(onFetch && this._getMore(next, skip, reload, loaded, total)) onFetch(endpoint, query)
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
