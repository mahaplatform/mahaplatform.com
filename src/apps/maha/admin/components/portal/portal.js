import { CSSTransition } from 'react-transition-group'
import { Modal, Prompt, Tasks } from 'maha-admin'
import Navigation from '../navigation'
import { connect } from 'react-redux'
import { RouterStack } from 'maha-admin'
import Dashboard from '../dashboard'
import PropTypes from 'prop-types'
import Account from '../account'
import Sidebar from './sidebar'
import Ribbon from './ribbon'
import React from 'react'
import Help from '../help'

class Portal extends React.Component {

  static childContextTypes = {
    portal: PropTypes.object
  }

  static contextTypes = {
    host: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    badges: PropTypes.array,
    help: PropTypes.bool,
    mode: PropTypes.string,
    routes: PropTypes.object,
    unseen: PropTypes.number,
    onHelp: PropTypes.func,
    onChoose: PropTypes.func,
    onSetMode: PropTypes.func,
    onUpdateUnseen: PropTypes.func,
    onToggleHelp: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleCloseSidebar = this._handleCloseSidebar.bind(this)
  _handleHelp = this._handleHelp.bind(this)
  _handleSetMode = this._handleSetMode.bind(this)
  _handleUpdateUnseen = this._handleUpdateUnseen.bind(this)

  render() {
    const { active, badges, help, mode } = this.props
    return (
      <div className={ this._getClass() }>
        <Modal>
          <div className="maha-portal-main">
            <Prompt>
              <Modal>
                <Tasks>
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
                </Tasks>
              </Modal>
            </Prompt>
          </div>
          { help &&
            <div className="maha-portal-help">
              <Help { ...this._getHelp() } />
            </div>
          }
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
    const { routes } = this.props
    return {
      rootPath: '/admin',
      routes
    }
  }

  _getAccount() {
    return {
      onDone: () => this._handleSetMode(null)
    }
  }

  _getHelp() {
    return {
      onDone: this.props.onToggleHelp
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

  _handleHelp() {
    if(document.body.clientWidth > 768) return this.props.onToggleHelp()
    this.context.router.history.push('/admin/help')
  }

  _handleUpdateUnseen(unseen) {
    this.props.onUpdateUnseen(unseen)
  }

}

const mapStateToProps = (state, props) => ({
  user: state.maha.admin.user
})

export default connect(mapStateToProps)(Portal)
