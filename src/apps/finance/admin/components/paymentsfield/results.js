import PaymentTypeToken from '../../tokens/payment_type'
import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class Results extends React.Component {

  static propTypes = {
    records: PropTypes.array,
    selected: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="paymentsfield-payments">
        { records.map((record, index) => (
          <div className={ this._getClass(record) } key={`record_${index}`} onClick={ this._handleChoose.bind(this, index) }>
            <div className="paymentsfield-payment-icon">
              <i className={`fa fa-${ this._getIcon(index) }`} />
            </div>
            <div className="paymentsfield-payment-method">
              <div className="finance-payment-type-token">
                <img src={`/images/payments/${record.method}.png`} />
              </div>
            </div>
            <div className="paymentsfield-payment-label">
              <span>{ moment(record.date).format('MM/DD/YY') }</span><br />
              <strong>{ record.invoice.customer.display_name }</strong>
            </div>
            <div className="paymentsfield-payment-type">
              { record.type }
            </div>
            <div className="paymentsfield-payment-amount">
              { numeral(record.amount).format('0.00') }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getClass(record) {
    const classes = ['paymentsfield-payment']
    if(this._getChecked(record)) classes.push('selected')
    return classes.join(' ')
  }

  _getChecked(index) {
    const { selected } = this.props
    return _.includes(selected, index)
  }

  _getIcon(index) {
    return this._getChecked(index) ? 'check-circle' : 'circle-o'
  }

  _handleChoose(index) {
    this.props.onChoose(this._getChecked(index) ? this.props.selected.filter(i => {
      return index !== i
    }) : [
      ...this.props.selected,
      index
    ])
  }

}
export default Results
