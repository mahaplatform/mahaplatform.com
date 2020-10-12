import { createBrowserHistory } from 'history'
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
    children: PropTypes.any
  }

  _handleGoBack = this._handleGoBack.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleReplace = this._handleReplace.bind(this)

  render() {
    return this.props.children
  }


  getChildContext() {
    const { router } = this.context
    return {
      router: {
        location: router.location,
        history: {
          goBack: this._handleGoBack,
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

  _handleGoBack() {
    console.log('router goBack')
    this.context.router.history.goBack()
  }

  _handleReplace(path) {
    const route = this._getTeamRoute(path)
    console.log('router replace', route)
    this.context.router.history.replace(route)
  }

  _handlePush(path) {
    const route = this._getTeamRoute(path)
    console.log('router push', route)
    this.context.router.history.push(route)
  }

}

export default Router
