import { TransitionGroup, CSSTransition } from 'react-transition-group'
import TwoFactor from './twofactor'
import PropTypes from 'prop-types'
import Security from './security'
import Password from './password'
import Complete from './complete'
import Invalid from './invalid'
import Verify from './verify'
import React from 'react'
import _ from 'lodash'

class Reset extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    account: PropTypes.object,
    error: PropTypes.string,
    mode: PropTypes.string,
    token: PropTypes.string,
    show: PropTypes.bool,
    status: PropTypes.string,
    verification: PropTypes.object,
    onChangeMode: PropTypes.func,
    onSecurity: PropTypes.func,
    onPassword: PropTypes.func,
    onTogglePassword: PropTypes.func,
    onVerify: PropTypes.func
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
    this.props.onChangeMode('verify')
  }

  componentDidUpdate(prevProps) {
    const { flash } = this.context
    const { error, status } = this.props
    if(prevProps.status !== status) {
      if(status === 'failure') {
        flash.set('error', error)
      }
    }
  }

  componentWillUpdate(nextProps) {
    const { mode } = this.props
    if(nextProps.mode === mode) return
    const modes = ['verify','invalid','twofactor','security','password','complete']
    const oldIndex = _.indexOf(modes, mode)
    const newIndex = _.indexOf(modes, nextProps.mode)
    this.direction = (newIndex > oldIndex) ? 'forward' : 'backward'
  }

  _getMode(mode) {
    if(mode === 'verify') return <Verify { ...this._getVerify() } />
    if(mode === 'invalid') return <Invalid />
    if(mode === 'security') return <Security { ...this._getSecurity() } />
    if(mode === 'twofactor') return <TwoFactor { ...this._getTwoFactor() } />
    if(mode === 'password') return <Password { ...this._getPassword() } />
    if(mode === 'complete') return <Complete { ...this._getComplete() } />
  }

  _getVerify() {
    return _.pick(this.props, ['verification','onChangeMode','onVerify'])
  }

  _getTwoFactor() {
    return _.pick(this.props, ['account','status','token','onChangeMode'])
  }

  _getSecurity() {
    return _.pick(this.props, ['account','status','token','verification','onSecurity'])
  }

  _getPassword() {
    return _.pick(this.props, ['account','show','status','token','onPassword','onTogglePassword'])
  }

  _getComplete() {
    return _.pick(this.props, ['account','token'])
  }

}

export default Reset
