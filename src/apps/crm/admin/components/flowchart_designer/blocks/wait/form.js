import { Form } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Wait extends React.PureComponent {

  static propTypes = {
    config: PropTypes.object,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onDone: PropTypes.func,
    onTokens: PropTypes.func
  }

  state = {
    config: {}
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

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
      strategy: 'datetime'
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Wait',
      compact: true,
      onChange: this._handleChange,
      onChangeField: this._handleChangeField,
      onCancel: this._handleCancel,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { name: 'strategy', type: 'radiogroup', options: [{ value: 'datetime', text: 'Until a specific date and time' },{ value: 'duration', text: 'For a specific duration of time'}], defaultValue: config.strategy },
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

}

export default Wait
