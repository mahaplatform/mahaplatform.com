import { Form } from '@public'
import PropTypes from 'prop-types'
import React from 'react'

class Amountfield extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    balance: PropTypes.string,
    onValid: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  form = null

  state = {
    strategy: null,
    other: null
  }

  _handleSubmit = this._handleSubmit.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleChangeField = this._handleChangeField.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    return (
      <div className="amountfield">
        <Form { ...this._getForm() } />
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady(this._handleValidate)
  }

  _getForm() {
    const { balance } = this.props
    return {
      reference: node => this.form = node,
      inline: true,
      onChangeField: this._handleChangeField,
      onChange: this._handleChange,
      onSubmit: this._handleSubmit,
      fields: [
        { name: 'strategy', type: 'radiogroup', options: [{ value: 'balance', text: `Pay the balance: $${balance}` },{ value: 'other', text: 'Pay another amount' }], defaultValue: 'balance' },
        ...this._getAmountField()
      ]
    }
  }

  _getAmountField() {
    const { balance } = this.props
    const { strategy } = this.state
    return strategy === 'other' ? [
      { name: 'other', type: 'moneyfield', placeholder: 'Enter amount', required: true, rules: [`lessThanEqualTo:${balance}`] }
    ] : []
  }

  _handleChange({ strategy, other }) {
    const { balance, onChange } = this.props
    const amount = strategy === 'balance' ? balance : other
    onChange(amount)
  }

  _handleChangeField(key, value) {
    this.setState({
      [key]: value
    })
  }

  _handleSubmit(data) {
    const { strategy, other } = data
    const { balance, onValid } = this.props
    const amount = strategy === 'balance' ? balance : other
    onValid(amount)
  }

  _handleValidate() {
    this.form.submit()
  }

}

export default Amountfield
