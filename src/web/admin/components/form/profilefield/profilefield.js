import PropTypes from 'prop-types'
import Picker from './picker'
import React from 'react'

class Profilefield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    cid: PropTypes.string,
    formatter: PropTypes.func,
    profiles: PropTypes.array,
    profile: PropTypes.object,
    selected: PropTypes.number,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onChoose: PropTypes.func,
    onClear: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    formatter: (profile) => profile.id,
    onChange: () => {},
    onReady: () => {}
  }

  _handleClear = this._handleClear.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handlePick = this._handlePick.bind(this)

  render() {
    const { profile } = this.props
    return (
      <div className="profilefield" onClick={ this._handlePick }>
        { profile ?
          <div className="profilefield-profile">
            <div className="profilefield-profile-logo">
              <img src={`/imagecache/w=50${profile.photo}`} />
            </div>
            <div className="profilefield-profile-details">
              <strong>{ profile.username }</strong><br />
              { profile.service }
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

  _getPicker() {
    const { cid, onChoose } = this.props
    return {
      cid,
      onChoose
    }
  }

  _handleChange() {
    const { formatter } = this.props
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
    const channel = '/admin/account/profiles'
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const channel = '/admin/account/profiles'
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }
  
  _handlePick() {
    this.context.form.push(<Picker { ...this._getPicker() } />)
  }

}

export default Profilefield
