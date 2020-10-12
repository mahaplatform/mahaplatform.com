import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Activate from '../activate'
import Portal from '../portal'
import Signin from '../signin'
import Reset from '../reset'
import React from 'react'
import _ from 'lodash'

class Sessions extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    apps: PropTypes.array,
    badges: PropTypes.array,
    children: PropTypes.any,
    pathname: PropTypes.string,
    roots: PropTypes.array,
    routes: PropTypes.object,
    team: PropTypes.object,
    user: PropTypes.object
  }

  render() {
    const { pathname } = this.context.router.history.location
    const { roots, team, user } = this.props
    if(pathname.match(/^\/activate/) !== null) return <Activate />
    if(pathname.match(/^\/reset/) !== null) return <Reset />
    if(pathname.match(/^\/signin/) !== null) return <Signin />
    if(!user || !team) return null
    return (
      <div className="maha-sessions">
        <TransitionGroup component={ null }>
          <CSSTransition key={ user.id } timeout={ 1000 } classNames="flip" appear={ false }>
            <div className="maha-session">
              { roots.filter(root => {
                return root.app === 'maha' || this._getAccess(root.app)
              }).reduce((roots, root, index) => (
                <root.component key={`root_${index}`}>
                  { roots }
                </root.component>
              ), <Portal { ...this._getPortal() } />) }
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }

  _getAccess(code) {
    return (_.findIndex(this.props.apps, { code }) >= 0)
  }

  _getPortal() {
    const { badges, roots, routes } = this.props
    return {
      badges,
      roots,
      routes
    }
  }

}

const mapStateToProps = (state, props) => ({
  apps: state.maha.admin.apps,
  history: state.maha.router.history,
  team: state.maha.admin.team,
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Sessions)
