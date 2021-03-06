import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'

class Time extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    mode: PropTypes.string,
    time: PropTypes.object,
    onDone: PropTypes.func
  }

  static defaultProps = {
    time: {}
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
    const { time } = this.props
    this.setState({
      config: time
    })
  }

  _getForm() {
    const { config } = this.state
    const { mode } = this.props
    return {
      title: 'Time',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      saveText: mode === 'new' ? 'Add' : 'Update',
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: config.code },
            { label: 'Start Time', name: 'start_time', type: 'timefield', required: true, placeholder: 'Enter Start Time', defaultValue: config.start_time },
            { label: 'End Time', name: 'end_time', type: 'timefield', required: true, placeholder: 'Enter End Time', defaultValue: config.end_time }
          ]
        }
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

export default Time
