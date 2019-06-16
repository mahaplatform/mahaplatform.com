import { BrowserRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Router extends React.Component {

  static childContextTypes = {
    router: PropTypes.object
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    children: PropTypes.any,
    history: PropTypes.array,
    routes: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleReplace = this._handleReplace.bind(this)

  render() {
    return this.props.children
  }

  componentDidMount() {
    this.props.onPush({
      pathname: window.location.pathname,
      hash: window.location.hash.slice(1),
      search: window.location.search.slice(1)
    })
  }

  getChildContext() {
    const { action, history } = this.props
    const last = history.slice(-1)[0] || {}
    return {
      router: {
        action,
        pathname: last.pathname,
        search: last.search,
        hash: last.hash,
        goBack: this._handleBack,
        push: this._handlePush,
        replace: this._handleReplace
      }
    }
  }

  _getRoute(path) {
    if(!_.isString(path)) return path
    const route = new URL(`http://localhost${path}`)
    return {
      pathname: route.pathname,
      search: route.search.replace('?', ''),
      hash: route.hash
    }
  }

  _handleBack() {
    const { history } = this.props
    this.props.onPop()
    const replacement = history.slice(0,-1).slice(-1)[0] || '/admin'
    this.context.router.history.replace(replacement)
  }

  _handleReplace(path) {
    const route = this._getRoute(path)
    this.context.router.history.replace(route)
  }

  _handlePush(path) {
    const route = this._getRoute(path)
    this.props.onPush(route)
    this.context.router.history.replace(route)
  }

}

class RouterWrapper extends React.Component {

  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <BrowserRouter>
        <Router { ...this.props } />
      </BrowserRouter>
    )
  }

}

export default RouterWrapper
