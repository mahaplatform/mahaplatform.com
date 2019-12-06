import SalesReport from '../../components/sales_report'
import PropTypes from 'prop-types'
import React from 'react'

class Sales extends React.Component {

  static propTypes = {
    customer: PropTypes.object
  }

  static defaultProps = {}

  render() {
    return <SalesReport { ...this._getSales() } />
  }

  _getSales() {
    const { customer } = this.props
    return {
      endpoint: `/api/admin/finance/customers/${customer.id}/sales`,
      filter: {
        customer_id: {
          $in: [customer.id]
        }
      },
      start: customer.created_at
    }
  }

}

export default Sales
