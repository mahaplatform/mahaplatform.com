import RecordingField from '../recordingfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class Optionsfield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    onDone: PropTypes.func
  }

  state = {
    config: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefault()
      }
    })
  }

  _getDefault() {
    return {
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      strategy: 'say',
      voice: 'woman'
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Option',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      saveText: 'Add',
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: config.code },
            { label: 'Option', type: 'segment', fields: [
              { name: 'name', type: 'textfield', required: true, placeholder: 'Enter a name', defaultValue: config.name },
              { name: 'number', type: 'numberfield', required: true, placeholder: 'Enter a number', maxLength: 3, defaultValue: config.number }
            ] },
            { label: 'Announcement', type: 'segment', fields: [
              { name: 'strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'say', text: 'Speak text' },
                { value: 'play', text: 'Play recording' }
              ], defaultValue: config.strategy },
              ...this._getStrategy()
            ] }
          ]
        }
      ]
    }
  }

  _getStrategy() {
    const { config } = this.state
    console.log(config)
    if(config.strategy === 'say') {
      return [
        { name: 'voice', type: 'dropdown', options: [
          { value: 'woman', text: 'Female Voice' },
          { value: 'man', text: 'Male Voice' }
        ], required: true, defaultValue: config.voice },
        { name: 'text', type: 'textarea', placeholder: 'For {username}, dial {extension}', required: true, defaultValue: config.text }
      ]
    } else if(config.strategy === 'play') {
      return [
        { label: 'Recording', name: 'recording_id', type: RecordingField, required: true, defaultValue: config.recording_id }
      ]
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChange(config) {
    this.setState({ config })
  }

  _handleDone() {
    const { config } = this.state
    this.props.onDone(config)
    this.context.form.pop()
  }

}

export default Optionsfield
