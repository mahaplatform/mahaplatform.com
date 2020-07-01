import SalesReport from '../../components/sales_report'
import PropTypes from 'prop-types'
import React from 'react'

class Sales extends React.Component {

  static propTypes = {
    bank: PropTypes.object
  }

  static defaultProps = {}

  render() {
    return <SalesReport { ...this._getSales() } />
  }

  _getSales() {
    const { bank } = this.props
    return {
      endpoint: `/api/admin/finance/banks/${bank.id}/sales`,
      filter: {
        bank_id: {
          $in: [bank.id]
        }
      },
      start: bank.created_at
    }
  }

}

export default Sales
