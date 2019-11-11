import Loader from '../loader'
import Message from '../message'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

const Creator = (mapResourcesToPage, Component) => {

  class Container extends React.Component {

    static contextTypes = {
      alert: PropTypes.object,
      admin: PropTypes.object,
      configuration: PropTypes.object,
      confirm: PropTypes.object,
      flash: PropTypes.object,
      host: PropTypes.object,
      modal: PropTypes.object,
      network: PropTypes.object,
      prompt: PropTypes.object,
      router: PropTypes.object,
      tasks: PropTypes.object
    }

    static propTypes = {
      component: PropTypes.object,
      data: PropTypes.object,
      ready: PropTypes.bool,
      resources: PropTypes.object,
      status: PropTypes.string,
      onFetchResource: PropTypes.func,
      onReady: PropTypes.func
    }

    state = {
      cacheKey: null
    }

    _handleFetchResources = this._handleFetchResources.bind(this)
    _handleInit = this._handleInit.bind(this)
    _handleReady = this._handleReady.bind(this)
    _handleRefreshResources = this._handleRefreshResources.bind(this)

    render() {
      const { status } = this.props
      if(!_.includes(['pending','loading','failure','forbidden'], status)) {
        return <Component { ...this._getComponent() } />
      }
      if(_.includes(['pending','loading'], status)) return <Loader />
      if(status === 'failure') return <Message { ...this._getFailure() } />
      if(status === 'forbidden') return <Message { ...this._getForbidden } />
    }

    componentDidMount() {
      setTimeout(this._handleInit, 500)
    }

    componentWillUnmount() {
      this._handleLeave()
    }

    _getFailure() {
      return {
        icon: 'exclamation-triangle',
        title: 'Unable to load this page',
        button: {
          label: 'Try again',
          handler: this._handleFetchResources
        }
      }
    }

    _getForbidden() {
      return {
        icon: 'exclamation-triangle',
        title: 'You do not have permission to access this content'
      }
    }

    _getComponent() {
      const { cacheKey } = this.state
      const { data } = this.props

      return {
        key: cacheKey,
        ...data,
        ..._.omit(this.props, ['cid','con','component','data','ready','resources','onFetchResource','onReady'])
      }
    }

    _getResourceParams(params) {
      if(_.isString(params)) return [params, null]
      if(params.filter) return [params.endpoint, { $filter: params.filter }]
      if(params.query) return [params.endpoint, params.query]
      return [params.endpoint]
    }

    _handleFetchResources() {
      const { params, pathname, onFetchResource } = this.props
      const page = { params, pathname }
      if(!mapResourcesToPage) return
      const resources = mapResourcesToPage(this.props, this.context, page)
      Object.keys(resources).map(prop => {
        const params = this._getResourceParams(resources[prop])
        onFetchResource(prop, ...params)
      })
    }

    _handleInit() {
      this._handleJoin()
      if(!mapResourcesToPage) return this._handleReady()
      this._handleFetchResources()
    }

    _handleJoin() {
      const { pathname } = this.props
      const { network } = this.context
      network.join(pathname)
      network.subscribe([
        { target: pathname, action: 'refresh', handler: this._handleRefreshResources }
      ])
    }

    _handleLeave() {
      const { pathname } = this.props
      const { network } = this.context
      network.leave(pathname)
      network.unsubscribe([
        { target: pathname, action: 'refresh', handler: this._handleRefreshResources }
      ])
    }

    _handleRefreshResources() {
      this.setState({ cacheKey: _.random(100000, 999999).toString(36) })
      this._handleFetchResources()
    }

    _handleReady() {
      this.props.onReady()
    }

  }

  return Container

}

export default Creator
