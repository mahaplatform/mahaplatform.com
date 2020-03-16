import RecordingField from '../../recordingfield'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
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
            { label: 'Recording', name: 'recording_id', type: RecordingField, defaultValue: config.recording_id },
            { label: 'Play', name: 'loop', type: 'dropdown', search: false, options: [{ value: 0, text: 'Loop Infinitely' },{ value: 1, text: 'Once' },{ value: 2, text: 'Twice' }], defaultValue: config.loop }
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
