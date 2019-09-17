import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Password from './password'
import Accounts from './accounts'
import Lockout from './lockout'
import Blocked from './blocked'
import Email from './email'
import React from 'react'
import Team from './team'
import Wait from './wait'
import _ from 'lodash'

class Signin extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    error: PropTypes.string,
    mode: PropTypes.string,
    show: PropTypes.bool,
    signin_id: PropTypes.string,
    status: PropTypes.string,
    teams: PropTypes.array,
    team: PropTypes.object,
    user: PropTypes.object,
    token: PropTypes.string,
    onChangeMode: PropTypes.func,
    onEmail: PropTypes.func,
    onPassword: PropTypes.func,
    onLockout: PropTypes.func,
    onSetId: PropTypes.func,
    onTeam: PropTypes.func
  }

  direction = 'forward'

  render() {
    const { mode } = this.props
    if(!mode) return null
    return (
      <div className={`maha-signin ${this.direction}`}>
        <TransitionGroup component={ null }>
          <CSSTransition key={ mode } timeout={ 500 } classNames="slide-next" appear={ false }>
            { this._getMode(mode) }
          </CSSTransition>
        </TransitionGroup>
      </div>
    )
  }

  componentDidMount() {
    const { teams } = this.props
    const mode = teams.length > 0 ? 'accounts' : 'team'
    const signin_id = _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    this.props.onSetId(signin_id)
    this.props.onChangeMode(mode)
  }

  componentWillUpdate(nextProps) {
    const { mode } = this.props
    if(nextProps.mode === mode) return
    const modes = ['accounts','team','email','password','lockout','blocked','wait']
    const oldIndex = _.indexOf(modes, mode)
    const newIndex = _.indexOf(modes, nextProps.mode)
    this.direction = (newIndex > oldIndex) ? 'forward' : 'backward'
  }

  componentDidUpdate(prevProps) {
    const { flash } = this.context
    const { error, status, token } = this.props
    if(prevProps.status !== status && status === 'failure') {
      flash.set('error', error)
    }
    if(prevProps.token !== token && token !== null) {
      this._handleSignin()
    }
  }

  _getMode(mode) {
    if(mode === 'accounts') return <Accounts { ...this._getAccounts() } />
    if(mode === 'team') return <Team { ...this._getTeam() } />
    if(mode === 'email') return <Email { ...this._getEmail() } />
    if(mode === 'password') return <Password { ...this._getPassword() } />
    if(mode === 'lockout') return <Lockout />
    if(mode === 'blocked') return <Blocked />
    if(mode === 'wait') return <Wait { ...this._getWait() }  />
    return <div />
  }

  _getAccounts() {
    return _.pick(this.props, ['active','removing','signin_id','status','teams','user','onChangeMode','onEmail','onSet','onToggleRemove'])
  }

  _getEmail() {
    return _.pick(this.props, ['status','team','user','onSet','onChangeMode','onEmail'])
  }

  _getPassword() {
    return _.pick(this.props, ['show','status','team','token','user','onForgot','onLockout','onPassword','onSet','onTogglePassword'])
  }

  _getTeam() {
    return _.pick(this.props, ['signin_id','status','teams','team','onChangeMode','onSet','onTeam'])
  }

  _getWait() {
    return _.pick(this.props, ['signin_id'])
  }

  _handleSignin() {
    const { admin, router } = this.context
    const { team, token, user } = this.props
    admin.signin(team, token, user)
    router.history.push('/admin')
  }

}

const mapStateToProps = (state, props) => ({
  active: state.maha.admin.active,
  teams: state.maha.admin.teams
})

export default connect(mapStateToProps)(Signin)
