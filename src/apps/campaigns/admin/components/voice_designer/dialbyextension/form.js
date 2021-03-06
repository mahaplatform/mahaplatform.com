import ExtensionsField from '../../extensionsfield'
import RecordingField from '../../recordingfield'
import SpeakField from '../../speakfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class DialByExtension extends React.PureComponent {

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
        ...this._getDefault(),
        ...this.props.config || {}
      }
    })
  }

  _getDefault() {
    return {
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      strategy: 'say',
      say: {
        voice: 'Salli',
        text: 'You may dial your party\'s extension at any time'
      },
      extensions: [],
      specials: []
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Dial By Extension',
      onCancel: this._handleCancel,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', defaultValue: config.code },
            { label: 'Greeting', instructions: `
              Play this greeting to inform the caller of their available
              options. The greeting will stop when the caller begins to dial.
            `, type: 'segment', fields: [
              { name: 'strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'say', text: 'Speak text' },
                { value: 'play', text: 'Play an audio file' }
              ], defaultValue: config.strategy },
              ...this._getStrategy()
            ] },
            { label: 'Extensions', name: 'extensions', type: ExtensionsField, required: true, defaultValue: config.extensions },
            { label: 'Special Characters', type: 'segment', fields: [
              { name: 'specials', type: 'checkboxes', deselectable: false, options: [
                { value: 'hash', text: 'Respond to hash (#)' },
                { value: 'star', text: 'Respond to star (*)' }
              ], defaultValue: config.specials }
            ] }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { config } = this.state
    if(config.strategy === 'say') {
      return [
        { name: 'say', type: SpeakField, placeholder: 'Enter a greeting', required: true, defaultValue: config.say }
      ]
    }
    if(config.strategy === 'play') {
      return [
        { name: 'recording_id', type: RecordingField, required: true, defaultValue: config.recording_id }
      ]
    }
    return []
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


export default DialByExtension
