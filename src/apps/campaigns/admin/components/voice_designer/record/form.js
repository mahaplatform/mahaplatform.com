import RecordingField from '../../recordingfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class Record extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  form = null

  state = {
    config: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    if(!this.state.config) return null
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
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      strategy: 'say',
      voice: 'woman',
      confirm: 'no'
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
            { name: 'code', type: 'hidden', defaultValue: config.code },
            { label: 'Name', name: 'name', type: 'tokenfield', placeholder: 'Enter a name', required: true, defaultValue: config.name },
            { label: 'How to request', type: 'segment', required: true, fields: [
              { name: 'strategy', type: 'radiogroup', required: true, options: [{ value: 'say', text: 'Speak text' },{ value: 'play', text: 'Play an audio file'}], defaultValue: config.strategy },
              ...this._getStrategy()
            ] },
            { label: 'Confirm Recoring?', name: 'confirm', type: 'radiogroup', instructions: `
              When the caller is done recording their message, you can play it
              back to them and let them record it again if they wish
            `, required: true, options: [{ value: 'no', text: 'No, immediately save recording' },{ value: 'yes', text: 'Yes, require confirmation' }], defaultValue: config.confirm }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { config } = this.state
    if(config.strategy === 'say') {
      return [
        { name: 'voice', type: 'dropdown', options: [{ value: 'woman', text: 'Female Voice' },{ value: 'man', text: 'Male Voice' }], required: true, defaultValue: config.voice },
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
