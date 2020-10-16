import matchPath from 'react-router-dom/matchPath'
import PropTypes from 'prop-types'
import React from 'react'
import Stack from './stack'

class Router extends React.Component {

  static propTypes = {
    prefix: PropTypes.string,
    routes: PropTypes.array,
    pathname: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.routes = this._collapseRoutes(props.routes, props.prefix)
    this.state = {
      cards: []
    }
  }

  render() {
    const { cards } = this.state
    return <Stack cards={ cards }/>
  }

  componentDidMount() {
    const { pathname } = this.props
    const route = this._matchRoute(pathname)
    const cards = [ route ]
    this.setState({ cards })
  }

  componentDidUpdate(prevProps) {
    const { pathname } = this.props
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
    const { pathname } = this.context.router.history.location
    return (
      <Router { ...this.props } pathname={ pathname }>
        { this.props.children }
      </Router>
    )
  }

}


export default RouterWrapper
