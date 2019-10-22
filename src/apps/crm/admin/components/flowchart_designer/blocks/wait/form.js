import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Wait extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    onChange: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    strategy: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return <Form { ...this.getForm() } />
  }

  componentDidMount() {
    const { config } = this.props
    this.setState({
      strategy: config.strategy
    })
  }

  getForm() {
    const { strategy } = this.state
    return {
      title: 'Wait',
      compact: true,
      onChange: this._handleChange,
      onChangeField: this._handleChangeField,
      onCancel: this._handleDone,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { name: 'strategy', type: 'radiogroup', options: [{ value: 'datetime', text: 'Until a specific date and time' },{ value: 'duration', text: 'For a specific duration of time'}], defaultValue: strategy },
            ...this._getStrategyFields()
          ]
        }
      ]
    }
  }

  _getStrategyFields() {
    const { strategy } = this.state
    const { config } = this.props
    if(strategy === 'duration') {
      return [
        { label: 'Duration', type: 'fields', fields: [
          { name: 'duration_days', type: 'numberfield', units: 'days', placeholder: 'Days', defaultValue: config.duration_days || 0 },
          { name: 'duration_hours', type: 'numberfield', units: 'hrs', placeholder: 'Hours', defaultValue: config.duration_hours || 0 },
          { name: 'duration_mins', type: 'numberfield', units: 'mins', placeholder: 'Mins', defaultValue: config.duration_mins || 0 }
        ] }
      ]
    } else {
      return [
        { label: 'Until', type: 'fields', fields: [
          { name: 'until_date', type: 'datefield', placeholder: 'Date', defaultValue: config.until_date || moment().add(1,'day').format('MM/DD/YYYY') },
          { name: 'until_time', type: 'timefield', placeholder: 'Time', defaultValue: config.until_time || '12:00 PM' }
        ] }
      ]
    }
  }

  _handleChange(config) {
    this.props.onChange(config)
  }

  _handleChangeField(key, value) {
    if(key === 'strategy') {
      this.setState({
        [key]: value
      })
    }
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Wait
