import RecordingField from '../../recordingfield'
import TokenField from '../../tokenfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

class Record extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  form = null

  state = {
    config: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefaults(),
        ...this.props.config || {}
      }
    })
  }

  _getDefaults() {
    return {
      strategy: 'say',
      voice: 'woman'
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Record',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      instructions: `
        You can record an audio message from the call recipient. The recording
        will begin when the recipient hears a beep and end when the
        recipient presses the pound key.
      `,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { label: 'Name', name: 'name', type: TokenField, required: true, defaultValue: config.name, placeholder: 'Enter a variable name' },
            { label: 'Message', type: 'segment', required: true, fields: [
              { label: 'How to request', name: 'strategy', type: 'radiogroup', required: true, options: [{ value: 'say', text: 'Speak text' },{ value: 'play', text: 'Play an audio file'}], defaultValue: config.strategy },
              ...this._getStrategy()
            ] },
            { label: 'Confirm Recoring?', name: 'confirm', type: 'radiogroup', required: true, options: [{ value: true, text: 'Yes, require confirmation' },{ value: false, text: 'No, immediately save recording' }], defaultValue: config.strategy }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { config } = this.state
    if(config.strategy === 'say') {
      return [
        { name: 'voice', type: 'dropdown', options: [{ value: 'woman', text: 'Female Voice' },{ value: 'man', text: 'Male Voice' }], defaultValue: config.voice },
        { name: 'message', type: 'textarea', placeholder: 'Enter a message', required: true, defaultValue: config.message }
      ]
    }
    return [
      { label: 'Recording', name: 'recording_id', required: true, type: RecordingField, defaultValue: config.recording_id }
    ]
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleDone() {
    const { config } = this.state
    this.props.onDone(config)
  }

  _handleSubmit() {
    this.form.submit()
  }

}

export default Record
