import { Dropdown, TextArea } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class SpeakField extends React.PureComponent {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    defaultValue: '',
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    ready: false,
    text: '',
    voice: 'Salli'
  }

  _handlePlay = this._handlePlay.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    if(!this.state.ready) return null
    return (
      <div className="crm-speakfield">
        <div className="crm-speakfield-dropdown">
          <Dropdown { ...this._getDropDown() } />
        </div>
        <div className="crm-speakfield-textarea">
          <TextArea { ...this._getTextArea() } />
        </div>
        <div className="crm-speakfield-speaker" onClick={ this._handlePlay }>
          <i className="fa fa-volume-up" /> Speak Text
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    this.setState({
      ...defaultValue,
      ready: true
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { text, voice } = this.state
    if(text !== prevState.text) {
      this._handleChange()
    }
    if(voice !== prevState.voice) {
      this._handleChange()
    }
  }

  _getDropDown() {
    const voices = [
      { name: 'Nicole', nationality: 'AU' },
      { name: 'Russell', nationality: 'AU' },
      { name: 'Amy', nationality: 'GB' },
      { name: 'Brian', nationality: 'GB' },
      { name: 'Emma', nationality: 'GB' },
      { name: 'Joanna', nationality: 'US' },
      { name: 'Kendra', nationality: 'US' },
      { name: 'Kimberly', nationality: 'US' },
      { name: 'Salli', nationality: 'US' },
      { name: 'Joey', nationality: 'US' },
      { name: 'Matthew', nationality: 'US' }
    ]
    const { voice } = this.state
    return {
      defaultValue: voice,
      options: voices.map(voice => ({
        value: voice.name,
        text: `${voice.name} (EN-${voice.nationality})`
      })),
      prompt: 'Choose a voice',
      onChange: this._handleUpdate.bind(this, 'voice')
    }
  }

  _getTextArea() {
    const { placeholder } = this.props
    const { text } = this.state
    return {
      defaultValue: text,
      placeholder,
      onChange: this._handleUpdate.bind(this, 'text')
    }
  }

  _handleChange() {
    const { text, voice } = this.state
    this.props.onChange({ text, voice })
  }

  _handlePlay() {
    const { team } = this.context.admin
    const { voice, text } = this.state
    const audio = new Audio(`/api/admin/speak?text=${encodeURIComponent(text)}&voice=${voice}&token=${team.token}`)
    audio.play()
  }

  _handleUpdate(key, value) {
    this.setState({
      [key]: value
    })
  }

}

export default SpeakField
