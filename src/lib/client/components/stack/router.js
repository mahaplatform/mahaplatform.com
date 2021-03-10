import matchPath from 'react-router-dom/matchPath'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Stack from './stack'
import React from 'react'

class RouterStack extends React.Component {

  static propTypes = {
    action: PropTypes.string,
    prefix: PropTypes.string,
    pathname: PropTypes.string,
    rootPath: PropTypes.string,
    routes: PropTypes.array
  }

  static defaultProps = {
    rootPath: '/'
  }

  routes = null

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
    const card = this._matchRoute(pathname)
    this.setState({
      cards: [ card ]
    })
  }

  componentDidUpdate(prevProps) {
    const { action, pathname } = this.props
    const { mounted } = this.state
    if(prevProps.pathname !== pathname) {
      if(action === 'push') {
        const card = this._matchRoute(pathname)
        this._handlePush(card)
        setTimeout(() => this.setState({ mounted: mounted + 1 }), 50)
      } else if(action === 'pop') {
        this.setState({ mounted: mounted - 1 })
        setTimeout(this._handlePop.bind(this), 50)
      }
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards
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

  _handlePush(card) {
    this.setState({
      cards: [
        ...this.state.cards,
        card
      ]
    })
  }

  _handlePop() {
    const cards = this.state.cards.slice(0, -1)
    this.setState({ cards })
  }

}

const mapStateToProps = (state, props) => ({
  action: state.maha.router.action.toLowerCase(),
  pathname: state.maha.router.history.slice(-1)[0].pathname
})

export default connect(mapStateToProps)(RouterStack)
