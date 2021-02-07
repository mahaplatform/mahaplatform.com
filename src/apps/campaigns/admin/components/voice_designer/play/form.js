import RecordingField from '../../recordingfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Play extends React.PureComponent {

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
      loop: 1
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Play Recording',
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
            { label: 'Step Name', name: 'name', type: 'textfield', placeholder: 'Enter a name for this step', required: true, defaultValue: config.name },
            { label: 'Recording', type: 'segment', fields: [
              { name: 'recording_id', type: RecordingField, required: true, defaultValue: config.recording_id },
              { name: 'loop', type: 'dropdown', search: false, options: [
                { value: 0, text: 'Loop Infinitely' },
                { value: 1, text: 'Play Once' },
                { value: 2, text: 'Play Twice' }
              ], required: true, defaultValue: config.loop }
            ]}
          ]
        }
      ]
    }
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

export default Play
