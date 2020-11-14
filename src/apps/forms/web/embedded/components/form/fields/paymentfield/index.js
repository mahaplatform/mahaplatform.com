import { MoneyField } from '@client'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class PaymentField extends React.Component {

  static propTypes = {
    description: PropTypes.string,
    is_tax_deductible: PropTypes.bool,
    project_id: PropTypes.number,
    required: PropTypes.bool,
    revenue_type_id: PropTypes.number,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
    value: null
  }

  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <div className="maha-paymentfield">
        <MoneyField { ...this._getMoneyField() } />
      </div>
    )
  }

  componentDidMount() {
    const { onReady } = this.props
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.props
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getMoneyField() {
    const { tabIndex } = this.props
    return {
      tabIndex,
      onChange: this._handleUpdate
    }
  }

  _getValue() {
    const { description, project_id, revenue_type_id, is_tax_deductible } = this.props
    const { code, value } = this.state
    return {
      line_items: value > 0 ? [{
        code,
        description,
        project_id,
        revenue_type_id,
        is_tax_deductible,
        quantity: 1,
        tax_rate: 0.00,
        price: value,
        total: value
      }] : []
    }
  }

  _handleChange() {
    this.props.onChange(this._getValue())
  }

  _handleUpdate(value) {
    this.setState({ value })
  }

  _handleValidate() {
    const { required } = this.props
    const { value } = this.state
    if(required && !value === 0) {
      this.props.onValidate(null, 'You must specify a value')
    } else {
      this.props.onValidate(this._getValue())
    }
  }

}

export default PaymentField
