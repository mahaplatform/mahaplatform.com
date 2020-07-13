import { MoneyField } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class DonationField extends React.Component {

  static propTypes = {
    description: PropTypes.string,
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
    value: null
  }

  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <div className="maha-donationfield">
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
    const { description, project_id, revenue_type_id } = this.props
    const { value } = this.state
    return {
      line_items: [{
        code: 'abc',
        description,
        project_id,
        revenue_type_id,
        is_tax_deductible: true,
        quantity: 1,
        tax_rate: 0.00,
        price: value,
        total: value
      }]
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

export default DonationField
