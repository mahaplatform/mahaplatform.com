import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

class AdminOverview extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    controls: PropTypes.any,
    items: PropTypes.object
  }

  _getListItems = this._getListItems.bind(this)
  _handlePhysicalPayments = this._handlePhysicalPayments.bind(this)
  _handleDigitalPaymentsCaptured = this._handleDigitalPaymentsCaptured.bind(this)
  _handleDigitalPaymentsSettled = this._handleDigitalPaymentsSettled.bind(this)
  _handleDeposits = this._handleDeposits.bind(this)
  _handleExpensesForReview = this._handleExpensesForReview.bind(this)
  _handleExpensesForExport = this._handleExpensesForExport.bind(this)

  render() {
    const { controls } = this.props
    const listItems = this._getListItems()

    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header">
          <div className="maha-dashboard-card-header-details">
            <h2>Finance Overview</h2>
          </div>
          { controls }
        </div>
        <div className="maha-dashboard-card-body">
          <div className="maha-list">
            { listItems.map((item, index) => (
              <div className={ this._getItemClass(item) } key={`finance_item_${index}`}  onClick={ item.handler }>
                <div className="maha-list-item-label">
                  <b>{ item.count }</b> { item.noun } { item.verb }
                </div>
                { item.count > 0 &&
                  <div className="maha-list-item-proceed">
                    <i className="fa fa-chevron-right" />
                  </div>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  _getItemClass(item) {
    let itemClass = 'maha-list-item'
    if(item.count > 0) {
      itemClass = `${ itemClass } maha-list-item-link`
    } else {
      itemClass = `${ itemClass } maha-list-item-gray`
    }
    return itemClass
  }

  _getListItems() {
    const { items } = this.props

    const listItems = [
      {
        count: items.physical_payments_count,
        handler: this._handlePhysicalPayments,
        noun: `cash/check ${pluralize('payment', items.physical_payments_count)}`,
        verb: 'to deposit'
      },
      {
        count: items.digital_payments_captured_count,
        handler: this._handleDigitalPaymentsCaptured,
        noun: `digital ${pluralize('payment', items.digital_payments_captured_count)}`,
        verb: 'pending settlement'
      },
      {
        count: items.digital_payments_settled_count,
        handler: this._handleDigitalPaymentsSettled,
        noun: `digital ${pluralize('payment', items.digital_payments_settled_count)}`,
        verb: 'pending disbursement'
      },
      {
        count: items.deposits_count,
        handler: this._handleDeposits,
        noun: pluralize('deposit', items.deposits_count),
        verb: 'to export'
      },
      {
        count: items.expenses_approved_count,
        handler: this._handleExpensesForReview,
        noun: pluralize('expense', items.expenses_approved_count),
        verb: 'to review'
      },
      {
        count: items.expenses_reviewed_count,
        handler: this._handleExpensesForExport,
        noun: pluralize('expense', items.expenses_reviewed_count),
        verb: 'to export'
      }
    ]

    return listItems
  }

  _handleDeposits() {
    this.context.router.history.push('/admin/finance/deposits?$filter[$and][0][status][$in][0]=pending')
  }

  _handleExpensesForReview() {
    this.context.router.history.push('/admin/finance/reports?$filter[$and][0][status][$in][0]=approved')
  }

  _handleExpensesForExport() {
    this.context.router.history.push('/admin/finance/reports?$filter[$and][0][status][$in][0]=reviewed')
  }

  _handlePhysicalPayments() {
    this.context.router.history.push('/admin/finance/payments?$filter[$and][0][status][$in][0]=received&$filter[$and][1][method][$in][0]=cash&$filter[$and][1][method][$in][1]=check')
  }

  _handleDigitalPaymentsCaptured() {
    this.context.router.history.push('/admin/finance/payments?$filter[$and][0][status][$in][0]=captured&$filter[$and][1][method][$in][0]=ach&$filter[$and][1][method][$in][1]=card&$filter[$and][1][method][$in][2]=googlepay&$filter[$and][1][method][$in][3]=applepay&$filter[$and][1][method][$in][4]=paypal')
  }

  _handleDigitalPaymentsSettled() {
    this.context.router.history.push('/admin/finance/payments?$filter[$and][0][status][$in][0]=settled&$filter[$and][1][method][$in][0]=ach&$filter[$and][1][method][$in][1]=card&$filter[$and][1][method][$in][2]=googlepay&$filter[$and][1][method][$in][3]=applepay&$filter[$and][1][method][$in][4]=paypal')
  }

}

const mapResources = (props, context) => ({
  items: {
    endpoint: '/api/admin/finance/dashboard/admin_overview'
  }
})

export default Container(mapResources)(AdminOverview)
