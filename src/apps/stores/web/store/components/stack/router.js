import matchPath from 'react-router-dom/matchPath'
import PropTypes from 'prop-types'
import React from 'react'
import Stack from './stack'

class Router extends React.Component {

  static propTypes = {
    action: PropTypes.string,
    rootPath: PropTypes.string,
    prefix: PropTypes.string,
    routes: PropTypes.array,
    pathname: PropTypes.string
  }

  static defaultProps = {
    rootPath: '/'
  }

  state = {
    cards: []
  }

  constructor(props) {
    super(props)
    this.routes = this._collapseRoutes(props.routes, props.prefix)
  }

  render() {
    return <Stack { ...this._getStack() }/>
  }

  componentDidMount() {
    const { pathname, rootPath } = this.props
    if(pathname === rootPath) return
    const route = this._matchRoute(pathname)
    const cards = [ route ]
    this.setState({ cards })
  }

  componentDidUpdate(prevProps) {
    const { action, pathname } = this.props
    if(prevProps.pathname !== pathname) {
      const routeIndex = this.state.cards.reduce((routeIndex, route, index) => {
        return routeIndex !== null ? routeIndex : (route.pathname === pathname ? index : null)
      }, null)
      if(routeIndex !== null) return this.setState({ cards: this.state.cards.slice(0, routeIndex + 1) })
      const route = this._matchRoute(pathname)
      if(!route) return
      this.setState({
        cards:[
          ...this.state.cards,
          route
        ]
      })
    }
    if(prevProps.action !== action) {
      console.log('action', action)
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _collapseRoutes(routes, prefix = '') {
    return routes.reduce((routes, route) => {
      const path = (route.path !== '/') ? route.path : ''
      const segment = (route.children) ? this._collapseRoutes(route, `${prefix}${path}`) : {
        [`${prefix}${path}`]: {
          component: route.component,
          params: route.params,
          props: route.props
        }
      }
      return {
        ...routes,
        ...segment
      }
    }, {})
  }

  _matchRoute(pathname) {
    return Object.keys(this.routes).reduce((component, path) => {
      if(component) return component
      const matched = matchPath(pathname, { path, exact: true })
      if(!matched) return null
      return {
        pathname,
        ...this.routes[path],
        params: matched.params
      }
    }, null)
  }

}


class RouterWrapper extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any
  }

  render() {
    const { action, location } = this.context.router.history
    return (
      <Router { ...this.props } action={ action.toLowerCase() } pathname={ location.pathname }>
        { this.props.children }
      </Router>
    )
  }

}


export default RouterWrapper
