import TimesField from '../timesfield'
import PropTypes from 'prop-types'
import { Form } from '@admin'
import React from 'react'
import _ from 'lodash'

class TimeBlock extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    mode: PropTypes.string,
    timeblock: PropTypes.object,
    onDone: PropTypes.func
  }

  static defaultProps = {
    timeblock: {}
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
    const { timeblock } = this.props
    this.setState({
      config: {
        ...this._getDefault(),
        ...timeblock
      }
    })
  }

  _getDefault() {
    return {
      code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    }
  }

  _getForm() {
    const { config } = this.state
    const { mode } = this.props
    return {
      title: 'Time Block',
      cancelIcon: 'chevron-left',
      onCancel: this._handleBack,
      onChange: this._handleChange,
      onSuccess: this._handleDone,
      saveText: mode === 'new' ? 'Add' : 'Update',
      sections: [
        {
          fields: [
            { name: 'code', type: 'hidden', value: config.code },
            { label: 'Name', name: 'name', type: 'textfield', required: true, placeholder: 'Enter a name', defaultValue: config.name },
            { label: 'Days', name: 'days', type: 'checkboxes', options: [
              { value: 0, text: 'Sunday' },
              { value: 1, text: 'Monday' },
              { value: 2, text: 'Tuesday' },
              { value: 3, text: 'Wednesday' },
              { value: 4, text: 'Thursday' },
              { value: 5, text: 'Friday' },
              { value: 6, text: 'Saturday' }
            ], defaultValue: config.days },
            { label: 'Times', name: 'times', type: TimesField, required: true, defaultValue: config.times }
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

export default TimeBlock
