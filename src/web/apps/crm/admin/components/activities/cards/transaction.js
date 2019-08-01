import PropTypes from 'prop-types'
import numeral from 'numeral'
import React from 'react'

class Transaction extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    const { card, amount, transaction_id } = activity.data
    return (
      <div className="crm-timeline-item-card-transaction">
        <strong>Card:</strong> { card }<br />
        <strong>Amount:</strong> { numeral(amount).format('$0.00') }<br />
        <strong>Transaction ID:</strong> { transaction_id}<br />
        <span className="link">View Transaction</span>
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

}

export default Transaction
