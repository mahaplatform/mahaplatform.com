import { CSSTransition } from 'react-transition-group'
import { Modal, Prompt, Tasks } from '@admin'
import { RouterStack } from '@admin'
import Navigation from '../navigation'
import { connect } from 'react-redux'
import Dashboard from '../dashboard'
import PropTypes from 'prop-types'
import Revision from '../revision'
import Account from '../account'
import Sidebar from './sidebar'
import Ribbon from './ribbon'
import React from 'react'

class Portal extends React.Component {

  static childContextTypes = {
    portal: PropTypes.object
  }

  static contextTypes = {
    admin: PropTypes.object,
    host: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    badges: PropTypes.array,
    mode: PropTypes.string,
    routes: PropTypes.object,
    unseen: PropTypes.number,
    onChoose: PropTypes.func,
    onSetMode: PropTypes.func,
    onUpdateUnseen: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleCloseSidebar = this._handleCloseSidebar.bind(this)
  _handleSetMode = this._handleSetMode.bind(this)
  _handleUpdateUnseen = this._handleUpdateUnseen.bind(this)

  render() {
    const { active, badges, mode } = this.props
    return (
      <div className={ this._getClass() }>
        <Modal>
          <div className="maha-portal-main">
            <Prompt>
              <Modal>
                <Tasks>
                  <Revision>
                    <div className="maha-portal-frame">
                      <div className="maha-portal-ribbon">
                        <Ribbon { ...this._getRibbon() } />
                      </div>
                      { active !== null && <Sidebar sidebar={ badges[active].sidebar } /> }
                      <div className="maha-portal-body">
                        <Dashboard />
                        <RouterStack { ...this._getStack() } />
                      </div>
                      <CSSTransition in={ mode !== null } classNames="fade" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
                        <div className="maha-portal-overlay" onClick={ this._handleSetMode.bind(this, null) } />
                      </CSSTransition>
                      <CSSTransition in={ mode === 'account' } classNames="slidein" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
                        <div className="maha-portal-account">
                          <Account { ...this._getAccount() } />
                        </div>
                      </CSSTransition>
                      <div className="maha-portal-navigation">
                        <Navigation { ...this._getNavigation() } />
                      </div>
                    </div>
                  </Revision>
                </Tasks>
              </Modal>
            </Prompt>
          </div>
        </Modal>
      </div>
    )
  }

  componentDidMount() {
    this.context.host.updateUnseen(0)
  }

  componentDidUpdate(prevProps) {
    const { unseen } = this.props
    if(unseen !== prevProps.unseen) {
      this.context.host.updateUnseen(unseen)
    }
  }

  getChildContext() {
    return {
      portal: {
        closeSidebar: this._handleCloseSidebar,
        updateUnseen: this._handleUpdateUnseen
      }
    }
  }

  _getClass() {
    const { active, mode } = this.props
    const classes = ['maha-portal']
    if(active !== null) classes.push('sidebar')
    if(mode) classes.push(mode)
    return classes.join(' ')
  }

  _getRibbon() {
    const { active, badges } = this.props
    return {
      active,
      badges,
      onChoose: this._handleChoose,
      onHelp: this._handleHelp,
      onSetMode: this._handleSetMode
    }
  }

  _getStack() {
    const { admin } = this.context
    const { routes } = this.props
    return {
      rootPath: `/${admin.team.subdomain}`,
      routes
    }
  }

  _getAccount() {
    return {
      onDone: () => this._handleSetMode(null)
    }
  }

  _getNavigation() {
    return {
      onDone: () => this._handleSetMode(null)
    }
  }

  _handleChoose(index) {
    const { badges } = this.props
    if(document.body.clientWidth > 768) return this.props.onChoose(index)
    const badge = badges[index]
    if(badge.route) this.context.router.history.push(badge.route)
  }

  _handleSetMode(mode) {
    this.props.onSetMode(mode)
  }

  _handleCloseSidebar() {
    this.props.onChoose(null)
  }

  _handleUpdateUnseen(unseen) {
    this.props.onUpdateUnseen(unseen)
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Portal)
