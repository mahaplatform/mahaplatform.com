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
      pathname: PropTypes.string,
      params: PropTypes.object,
      prompt: PropTypes.object,
      router: PropTypes.object,
      tasks: PropTypes.object
    }

    static propTypes = {
      component: PropTypes.object,
      data: PropTypes.object,
      params: PropTypes.object,
      pathname: PropTypes.string,
      ready: PropTypes.bool,
      resources: PropTypes.object,
      status: PropTypes.string,
      onFetchResource: PropTypes.func,
      onSetReady: PropTypes.func
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
        ..._.omit(this.props, ['cid','con','component','data','ready','status','resources','onFetchResource','onSetReady'])
      }
    }

    _getResourceParams(params) {
      if(_.isString(params)) return [params, null]
      if(params.filter) return [params.endpoint, { $filter: params.filter }]
      if(params.query) return [params.endpoint, params.query]
      return [params.endpoint]
    }

    _getResources() {
      const { params, pathname } = this.props
      const page = { params, pathname }
      if(!mapResourcesToPage) return []
      const resources = mapResourcesToPage(this.props, this.context, page)
      return Object.keys(resources).filter(key => {
        if(_.isString(resources[key]) || !resources[key].rights) return true
        return this._getUserHasRights(resources[key].rights)
      }).reduce((all, key) => ({
        ...all,
        [key]: resources[key]
      }), {})
    }

    _getUserHasRights(expected) {
      const { admin } = this.context
      if(!expected) return true
      return expected.reduce((permit, right) => {
        return (!_.includes(admin.rights, right)) ? false : permit
      }, true)
    }

    _handleFetchResources() {
      const { onFetchResource } = this.props
      const resources = this._getResources()
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
      const resources = this._getResources()
      if(pathname) {
        network.join(pathname)
        network.subscribe([
          { target: pathname, action: 'refresh', handler: this._handleRefreshResources }
        ])
      }
      if(resources.length === 0) return
      Object.values(resources).map(resource => {
        if(!resource.refresh) return
        network.join(resource.refresh)
        network.subscribe([
          { target: resource.refresh, action: 'refresh', handler: this._handleRefreshResources }
        ])
      })
    }

    _handleLeave() {
      const { pathname } = this.props
      const { network } = this.context
      const resources = this._getResources()
      if(pathname) {
        network.leave(pathname)
        network.unsubscribe([
          { target: pathname, action: 'refresh', handler: this._handleRefreshResources }
        ])
      }
      if(resources.length === 0) return
      Object.values(resources).map(resource => {
        if(!resource.refresh) return
        network.leave(resource.refresh)
        network.subscribe([
          { target: resource.refresh, action: 'refresh', handler: this._handleRefreshResources }
        ])
      })
    }

    _handleRefreshResources() {
      this.setState({ cacheKey: _.random(100000, 999999).toString(36) })
      this._handleFetchResources()
    }

    _handleReady() {
      this.props.onSetReady()
    }

  }

  return Container

}

export default Creator
