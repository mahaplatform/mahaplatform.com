import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Notifications from './notifications'
import Question from './question'
import PropTypes from 'prop-types'
import Password from './password'
import Complete from './complete'
import Invalid from './invalid'
import Welcome from './welcome'
import Answer from './answer'
import Avatar from './avatar'
import Verify from './verify'
import React from 'react'
import Cell from './cell'
import _ from 'lodash'

class Activate extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    error: PropTypes.string,
    message: PropTypes.string,
    mode: PropTypes.string,
    show: PropTypes.bool,
    status: PropTypes.string,
    token: PropTypes.string,
    team: PropTypes.object,
    photo_id: PropTypes.number,
    questions: PropTypes.array,
    question_id: PropTypes.number,
    user: PropTypes.object,
    onAvatar: PropTypes.func,
    onAuthorizeCell: PropTypes.func,
    onChangeMode: PropTypes.func,
    onChooseQuestion: PropTypes.func,
    onNotifications: PropTypes.func,
    onSecurity: PropTypes.func,
    onSetPhotoId: PropTypes.func,
    onPassword: PropTypes.func,
    onTogglePassword: PropTypes.func,
    onVerify: PropTypes.func,
    onVerifyCell: PropTypes.func
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
    const modes = ['verify','invalid','welcome','question','answer','password','cell','avatar','notifications','complete']
    const oldIndex = _.indexOf(modes, mode)
    const newIndex = _.indexOf(modes, nextProps.mode)
    this.direction = (newIndex > oldIndex) ? 'forward' : 'backward'
  }

  _getMode(mode) {
    if(mode === 'verify') return <Verify { ...this._getVerify() } />
    if(mode === 'invalid') return <Invalid />
    if(mode === 'welcome') return <Welcome { ...this._getWelcome() } />
    if(mode === 'question') return <Question { ...this._getQuestion() } />
    if(mode === 'answer') return <Answer { ...this._getAnswer() } />
    if(mode === 'password') return <Password { ...this._getPassword() } />
    if(mode === 'cell') return <Cell { ...this._getCell() } />
    if(mode === 'avatar') return <Avatar { ...this._getAvatar() } />
    if(mode === 'notifications') return <Notifications { ...this._getNotifications() } />
    if(mode === 'complete') return <Complete { ...this._getComplete() } />
  }

  _getVerify() {
    return _.pick(this.props, ['onVerify'])
  }

  _getWelcome() {
    return _.pick(this.props, ['team','user','onChangeMode'])
  }

  _getQuestion() {
    return _.pick(this.props, ['questions','onChooseQuestion'])
  }

  _getAnswer() {
    return _.pick(this.props, ['questions','question_id','status','token','onChangeMode','onSecurity'])
  }

  _getPassword() {
    return _.pick(this.props, ['show','status','token','onChangeMode','onPassword','onTogglePassword'])
  }

  _getCell() {
    return _.pick(this.props, ['token','onChangeMode','onAuthorizeCell', 'onVerifyCell'])
  }

  _getAvatar() {
    return _.pick(this.props, ['photo_id','token','onAvatar','onChangeMode','onSetPhotoId'])
  }

  _getNotifications() {
    return _.pick(this.props, ['token','onNotifications'])
  }

  _getComplete() {
    return _.pick(this.props, ['team','token','user'])
  }

}

export default Activate
