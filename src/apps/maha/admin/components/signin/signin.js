import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Password from './password'
import Lockout from './lockout'
import Blocked from './blocked'
import Email from './email'
import React from 'react'
import _ from 'lodash'

class Signin extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    account: PropTypes.object,
    error: PropTypes.string,
    mode: PropTypes.string,
    show: PropTypes.bool,
    status: PropTypes.string,
    team: PropTypes.object,
    token: PropTypes.string,
    onChangeMode: PropTypes.func,
    onEmail: PropTypes.func,
    onPassword: PropTypes.func,
    onLockout: PropTypes.func,
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
    const mode = 'email'
    this.props.onChangeMode(mode)
  }

  componentWillUpdate(nextProps) {
    const { mode } = this.props
    if(nextProps.mode === mode) return
    const modes = ['email','password','lockout','blocked','wait']
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
    if(mode === 'email') return <Email { ...this._getEmail() } />
    if(mode === 'password') return <Password { ...this._getPassword() } />
    if(mode === 'lockout') return <Lockout />
    if(mode === 'blocked') return <Blocked />
    return <div />
  }

  _getEmail() {
    return _.pick(this.props, ['account','status','onSet','onChangeMode','onEmail'])
  }

  _getPassword() {
    return _.pick(this.props, ['account','show','status','token','onForgot','onLockout','onPassword','onSet','onTogglePassword'])
  }

  _handleSignin() {
    const { account, token } = this.props
    this.context.admin.signin({
      id: account.id,
      full_name: account.full_name,
      initials: account.initials,
      email: account.email,
      photo: account.photo,
      token,
      authentication_strategy: account.authentication_strategy
    })
    this.context.router.history.push('/admin')
  }

}

export default Signin
