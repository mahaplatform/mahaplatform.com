import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

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
          <div className={ this._getClass(record) } key={`record_${index}`} onClick={ this._handleChoose.bind(this, record) }>
            <div className="paymentsfield-payment-icon">
              <i className={`fa fa-${ this._getIcon(record) }`} />
            </div>
            <div className="paymentsfield-payment-label">
              { moment(record.date).format('MM/DD/YY') }<br />
              { record.invoice.customer.display_name }
            </div>
            <div className="paymentsfield-payment-method">
              { record.method }
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

  _getChecked(record) {
    return this.props.selected.find(({ id }) => {
      return id === record.id
    }) !== undefined
  }

  _getIcon(record) {
    return this._getChecked(record) ? 'check-circle' : 'circle-o'
  }

  _handleChoose(record) {
    this.props.onChoose(this._getChecked(record) ? this.props.selected.filter(({ id }) => {
      return id !== record.id
    }) : [
      ...this.props.selected,
      record
    ])
  }

}
export default Results
