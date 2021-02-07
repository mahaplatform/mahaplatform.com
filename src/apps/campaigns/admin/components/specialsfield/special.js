import RecordingField from '../recordingfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class Special extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    mode: PropTypes.string,
    specials: PropTypes.array,
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
    const { mode, defaultValue } = this.props
    this.setState({
      config: mode === 'edit' ? defaultValue : this._getDefault()
    })
  }

  _getAvailable() {
    const { mode, defaultValue, specials } = this.props
    const available = [
      { value: 'hash', text: '# (hash key)' },
      { value: 'star', text: '* (star key)' }
    ]
    if(mode === 'edit') {
      return available.filter(option => {
        return option.value === defaultValue.character
      })
    }
    return available.filter(option => {
      return specials.find(special => {
        return special.character === option.value
      }) === undefined
    })
  }

  _getDefault() {
    const available = this._getAvailable()
    return {
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
      strategy: 'say',
      voice: 'woman',
      character: available[0].value
    }
  }

  _getForm() {
    const { config } = this.state
    const { mode } = this.props
    return {
      title: 'Special Character',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      saveText: mode === 'new' ? 'Add' : 'Update',
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: config.code },
            { label: 'Character', type: 'segment', fields: [
              { name: 'character', type: 'radiogroup', deselectable: false, options: this._getAvailable(), defaultValue: config.character }
            ] },
            { label: 'Announcement', type: 'segment', fields: [
              { name: 'strategy', type: 'radiogroup', deselectable: false, options: [
                { value: 'say', text: 'Speak text' },
                { value: 'play', text: 'Play recording' },
                { value: 'none', text: 'No announcement' }
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
    if(config.strategy === 'say') {
      return [
        { name: 'voice', type: 'dropdown', options: [
          { value: 'woman', text: 'Female Voice' },
          { value: 'man', text: 'Male Voice' }
        ], required: true, defaultValue: config.voice },
        { name: 'text', type: 'textarea', placeholder: 'For {username}, dial {extension}', required: true, defaultValue: config.text }
      ]
    }
    if(config.strategy === 'play') {
      return [
        { label: 'Recording', name: 'recording_id', type: RecordingField, required: true, defaultValue: config.recording_id }
      ]
    }
    return []
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

export default Special
