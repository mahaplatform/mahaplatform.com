import { Form } from '@admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Wait extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    program: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
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
        ...this._getDefault(),
        ...this.props.config || {}
      }
    })
  }

  _getDefault() {
    return {
      strategy: 'datetime',
      until_date: moment().add(1,'day').format('MM/DD/YYYY'),
      until_time: '12:00 PM',
      duration_days: 0,
      duration_hours: 0,
      duration_mins: 0
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      reference: node => this.form = node,
      title: 'Wait',
      compact: true,
      onChange: this._handleChange,
      onCancel: this._handleCancel,
      onSubmit: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleSubmit }
      ],
      sections: [
        {
          fields: [
            { name: 'strategy', type: 'radiogroup', required: true, options: [{ value: 'datetime', text: 'Until a specific date and time' },{ value: 'duration', text: 'For a specific duration of time'}], defaultValue: config.strategy },
            ...this._getStrategyFields()
          ]
        }
      ]
    }
  }

  _getStrategyFields() {
    const { config } = this.state
    if(config.strategy === 'duration') {
      return [
        { label: 'Duration', type: 'fields', fields: [
          { name: 'duration_days', type: 'numberfield', units: 'days', required: true, placeholder: 'Days', defaultValue: config.duration_days },
          { name: 'duration_hours', type: 'numberfield', units: 'hrs', required: true, placeholder: 'Hours', defaultValue: config.duration_hours },
          { name: 'duration_mins', type: 'numberfield', units: 'mins', required: true, placeholder: 'Mins', defaultValue: config.duration_mins }
        ] }
      ]
    } else {
      return [
        { label: 'Until', type: 'fields', fields: [
          { name: 'until_date', type: 'datefield', required: true, placeholder: 'Date', defaultValue: config.until_date },
          { name: 'until_time', type: 'timefield', required: true, placeholder: 'Time', defaultValue: config.until_time }
        ] }
      ]
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleChange(config) {
    this.setState({
      config: {
        ...this.state.config,
        ...config
      }
    })
  }

  _handleDone(config) {
    this.props.onDone(config)
  }

  _handleSubmit() {
    this.form.submit()
  }

}

export default Wait
