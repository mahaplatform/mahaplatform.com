import PropTypes from 'prop-types'
import React from 'react'
import Sound from './sound'

class Sounds extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  sounds = [
    { value: 'ding', text: 'Ding' },
    { value: 'boing', text: 'Boing' },
    { value: 'drop', text: 'Drop' },
    { value: 'tada', text: 'Tada' },
    { value: 'plink', text: 'Plink' },
    { value: 'wow', text: 'Wow' },
    { value: 'here_you_go', text: 'Here you go' },
    { value: 'hi', text: 'Hi' },
    { value: 'knock_brush', text: 'Knock Brush' },
    { value: 'whoah', text: 'Whoah!' },
    { value: 'yoink', text: 'Yoink' }
  ]

  state = {
    notification_sound_enabled: true,
    notification_sound: 'ding'
  }

  _handleChange = this._handleChange.bind(this)
  _handleLookup = this._handleLookup.bind(this)
  _handlePlay = this._handlePlay.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { notification_sound_enabled, notification_sound } = this.state
    return (
      <div className="maha-preferences">
        <div className="maha-preference" onClick={ this._handleToggle }>
          <div className="maha-preference-icon">
            { notification_sound_enabled ?
              <i className="fa fa-fw fa-check-circle" /> :
              <i className="fa fa-fw fa-circle-o" />
            }
          </div>
          <div className="maha-preference-label">
            Play the <span onClick={ this._handleLookup }>
              { this.sounds.find(sound => sound.value === notification_sound).text }
            </span> sound when I get a notification
            ( <span onClick={ this._handlePlay }>demo</span> )
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    const { defaultValue } = this.props
    if(defaultValue) this.setState(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { notification_sound_enabled, notification_sound } = this.state
    if(notification_sound_enabled !== prevState.notification_sound_enabled) {
      this.props.onChange(this.state)
    }
    if(notification_sound !== prevState.notification_sound) {
      this.props.onChange(this.state)
    }
  }

  _getSound() {
    return {
      defaultValue: this.state.notification_sound,
      onDone: this._handleChange
    }
  }

  _handleLookup(e) {
    e.stopPropagation()
    this.context.form.push(Sound, this._getSound.bind(this))
  }

  _handleChange(notification_sound) {
    this.setState({
      notification_sound
    })
  }

  _handlePlay(e) {
    const { notification_sound } = this.state
    e.stopPropagation()
    const audio = new Audio(`/admin/audio/${notification_sound}.mp3`)
    audio.play()
  }

  _handleToggle() {
    this.setState({
      notification_sound_enabled: !this.state.notification_sound_enabled
    })
  }

}

export default Sounds
