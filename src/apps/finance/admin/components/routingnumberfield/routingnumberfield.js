import { TextField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class RoutingNumberField extends React.PureComponent {

  static propTypes = {
    number: PropTypes.string,
    bank: PropTypes.object,
    onLookup: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onReady: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  _handleLookup = _.debounce(this._handleLookup.bind(this), 250, { trailing: true })
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { bank } = this.props
    return (
      <div className="routing-number-field">
        <TextField { ...this._getTextField() } />
        { bank &&
          <div className="routing-number-field-bank">
            <div className="routing-number-field-bank-details">
              <strong>{ bank.customer_name }</strong><br />
              { bank.address }
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { bank, number } = this.props
    if(number !== prevProps.number) {
      this._handleLookup()
    }
    if(!_.isEqual(bank, prevProps.bank) && bank) {
      this._handleChange()
    }
  }

  _getTextField() {
    return {
      placeholder: 'Enter a routing number',
      onChange: this._handleUpdate
    }
  }

  _handleChange() {
    const { number, bank } = this.props
    this.props.onChange({
      number,
      bank_name: bank.customer_name
    })
  }

  _handleLookup() {
    const { number, onClear, onLookup } = this.props
    if(number.length !== 9) return onClear()
    onLookup(number)
  }

  _handleUpdate(value) {
    this.props.onUpdate(value)
  }


}

export default RoutingNumberField
