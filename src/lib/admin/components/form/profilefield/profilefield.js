import PropTypes from 'prop-types'
import Picker from './picker'
import React from 'react'
import _ from 'lodash'

class Profilefield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    cid: PropTypes.string,
    disabled: PropTypes.bool,
    formatter: PropTypes.func,
    profiles: PropTypes.array,
    profile: PropTypes.object,
    selected: PropTypes.number,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onClear: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    disabled: false,
    formatter: (profile) => profile.id,
    tabIndex: 0,
    onChange: () => {},
    onReady: () => {}
  }

  _handleClear = this._handleClear.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handlePick = this._handlePick.bind(this)

  render() {
    const { profile, tabIndex } = this.props
    return (
      <div className={ this._getClass() } onClick={ this._handlePick } tabIndex={ tabIndex }>
        { profile ?
          <div className="profilefield-profile">
            <div className="profilefield-profile-logo">
              <img src={`/imagecache/w=50${profile.photo}`} />
            </div>
            <div className="profilefield-profile-details">
              <strong>{ profile.username }</strong><br />
              { _.capitalize(profile.service) }
            </div>
            <div className="profilefield-profile-remove" onClick={ this._handleClear }>
              <i className="fa fa-times" />
            </div>
          </div> :
          <div className="profilefield-placeholder">
            Choose a profile
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this._handleJoin()
    this._handleFetch()
  }

  componentDidUpdate(prevProps) {
    const { profile, status, onReady } = this.props
    if(status !== prevProps.status) {
      if(status === 'loaded') onReady()
    }
    if(profile !== prevProps.profile) {
      this._handleChange()
    }
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getClass() {
    const { disabled } = this.props
    const classes = ['maha-input','profilefield']
    if(disabled) classes.push('disabled')
    return classes.join(' ')
  }

  _getPicker() {
    const { cid, onChoose } = this.props
    return {
      cid,
      onChoose
    }
  }

  _handleChange() {
    const { formatter } = this.props
    if(!this.props.profile) return
    const profile = formatter(this.props.profile)
    this.props.onChange(profile)
  }

  _handleClear(e) {
    e.stopPropagation()
    this.props.onClear()
  }

  _handleFetch() {
    this.props.onFetch()
  }

  _handleJoin() {
    const { network } = this.context
    const target = '/admin/account/profiles'
    network.join(target)
    network.subscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const target = '/admin/account/profiles'
    network.leave(target)
    network.unsubscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handlePick() {
    const { disabled } = this.props
    if(disabled) return
    this.context.form.push(Picker, this._getPicker.bind(this))
  }

}

export default Profilefield
