import RecordingField from '../../recordingfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'

const content_types = ['mpeg','mp3','wav','wave','x-wav','aiff','x-aifc','x-aiff','x-gsm','gsm','ulaw'].map(type => {
  return `audio/${type}`
})

class Play extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    config: {}
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefault(),
        ...this.props.config || {}
      }
    })
  }

  _getDefault() {
    return {
      strategy: 'upload'
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Play Recording',
      onChange: this._handleChange,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { name: 'strategy', type: 'radiogroup', options: [{ value: 'upload', text: 'Upload recording' },{ value: 'record', text: 'Call me to record the message' }], defaultValue: config.strategy },
            this._getRecording(),
            { label: 'Play', name: 'loop', type: 'lookup', search: false, options: [{ value: 0, text: 'Loop Infinitely' },{ value: 1, text: 'Once' },{ value: 2, text: 'Twice' }], defaultValue: config.loop }
          ]
        }
      ]
    }
  }

  _getRecording() {
    const { config } = this.state
    if(config.strategy === 'record') {
      return { label: 'Recording', name: 'recording_id', type: RecordingField, defaultValue: config.recording_id }
    } else {
      return { label: 'Recording', name: 'recording_id', type: 'attachmentfield', prompt: 'Choose File', allow: { content_types }, defaultValue: config.recording_id }
    }
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleDone() {
    const { config } = this.state
    this.props.onDone(config)
  }

}

export default Play
