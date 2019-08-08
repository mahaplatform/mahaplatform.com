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
    const { location } = window
    this.props.onPush({
      pathname: location.pathname,
      hash: location.hash.slice(1),
      search: location.search.slice(1)
    })
  }

  getChildContext() {
    const { router } = this.context
    return {
      router: {
        ...router,
        history: {
          ...router.history,
          goBack: this._handleBack,
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

  _handleBack() {
    const { history } = this.props
    this.props.onPop()
    const replacement = history.slice(0,-1).slice(1)[0] || '/admin'
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

export default Router
