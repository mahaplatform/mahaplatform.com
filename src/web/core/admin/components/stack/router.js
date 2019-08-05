import matchPath from 'react-router-dom/matchPath'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import Stack from './stack'

class RouterStack extends React.Component {

  static childContextTypes = {
    stack: PropTypes.object
  }

  static propTypes = {
    action: PropTypes.string,
    pathname: PropTypes.string,
    rootPath: PropTypes.string,
    routes: PropTypes.object
  }

  static defaultProps = {
    rootPath: '/'
  }

  state = {
    cards: []
  }

  render() {
    const { cards } = this.state
    return <Stack cards={ cards } />
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

  getChildContext() {
    return {
      stack: {
        push: this._handlePush.bind(this),
        pop: this._handlePop.bind(this)
      }
    }
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

  _matchRoute(pathname) {
    const { routes } = this.props
    return Object.keys(routes).reduce((component, path) => {
      if(component) return component
      const matched = matchPath(pathname, { path, exact: true })
      if(!matched) return null
      return {
        pathname,
        component: routes[path],
        props: {
          pathname,
          params: matched.params
        }
      }
    }, null)
  }

}

const mapStateToProps = (state, props) => ({
  action: state.maha.router.action.toLowerCase(),
  pathname: state.maha.router.history.slice(-1)[0].pathname
})

export default connect(mapStateToProps)(RouterStack)
