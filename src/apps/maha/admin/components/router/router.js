import { createBrowserHistory } from 'history'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Router extends React.Component {

  static childContextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    children: PropTypes.any,
    history: PropTypes.array,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onReplace: PropTypes.func
  }

  _handlePop = this._handlePop.bind(this)
  _handleListen = this._handleListen.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleReplace = this._handleReplace.bind(this)

  history = null
  listener = null
  last = []

  render() {
    return this.props.children
  }

  componentDidMount() {
    this.history = createBrowserHistory()
    this.listener = this.history.listen(this._handleListen)
    this.props.onPush({
      pathname: window.location.pathname,
      hash: window.location.hash.slice(1),
      search: window.location.search.slice(1)
    })
  }

  componentWillUnmount() {
    this.listener()
  }

  getChildContext() {
    return {
      router: {
        location: this.history ? this.history.location : null,
        history: {
          goBack: this._handlePop,
          push: this._handlePush,
          replace: this._handleReplace
        }
      }
    }
  }

  _getRoute(path) {
    if(!_.isString(path)) return path
    const route = new URL(`http://localhost${path}`)
    return {
      pathname: route.pathname,
      search: route.search,
      hash: route.hash
    }
  }

  _getTeamRoute(path) {
    const route = this._getRoute(path)
    return {
      ...route,
      pathname: route.pathname.replace(/^\/admin/, ''),
      search: route.search,
      hash: route.hash
    }
  }

  _handlePop() {
    this.history.goBack()
  }

  _handleListen(location, action) {
    if(this.last.length > 0 && this.last.slice(-1)[0].key === location.key) {
      this.last = this.last.slice(0,-1)
      this.props.onPush(location)
    } else if(action === 'PUSH') {
      this.last = []
      this.props.onPush(this._getTeamRoute(location))
    } else if(action === 'REPLACE') {
      this.props.onReplace(this._getTeamRoute(location))
    } else if(action === 'POP') {
      this.last.push(this.props.history.slice(-1)[0])
      this.props.onPop()
    }
  }

  _handleReplace(path) {
    const route = this._getTeamRoute(path)
    this.history.replace(route)
  }

  _handlePush(path) {
    const route = this._getTeamRoute(path)
    this.history.push(route)
  }

}

export default Router
