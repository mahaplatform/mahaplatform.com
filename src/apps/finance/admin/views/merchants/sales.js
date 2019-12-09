import SalesReport from '../../components/sales_report'
import PropTypes from 'prop-types'
import React from 'react'

class Sales extends React.Component {

  static propTypes = {
    merchant: PropTypes.object
  }

  static defaultProps = {}

  render() {
    return <SalesReport { ...this._getSales() } />
  }

  _getSales() {
    const { merchant } = this.props
    return {
      endpoint: `/api/admin/finance/merchants/${merchant.id}/sales`,
      filter: {
        merchant_id: {
          $in: [merchant.id]
        }
      },
      start: merchant.created_at
    }
  }

}

export default Sales