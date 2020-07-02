import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

class AdminTasks extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    controls: PropTypes.any,
    payments: PropTypes.array,
    deposits: PropTypes.array,
    expensesForReview: PropTypes.array,
    expensesForExport: PropTypes.array
  }

  _handlePayments = this._handlePayments.bind(this)
  _handleDeposits = this._handleDeposits.bind(this)
  _handleExpensesForReview = this._handleExpensesForReview.bind(this)
  _handleExpensesForExport = this._handleExpensesForExport.bind(this)

  render() {
    const { controls, payments, deposits, expensesForReview, expensesForExport } = this.props

    const listItems = [
      {
        records: payments,
        handler: this._handlePayments,
        noun: pluralize('payment', payments.length),
        verb: 'deposit'
      },
      {
        records: deposits,
        handler: this._handleDeposits,
        noun: pluralize('deposit', deposits.length),
        verb: 'export'
      },
      {
        records: expensesForReview,
        handler: this._handleExpensesForReview,
        noun: pluralize('expense', expensesForReview.length),
        verb: 'review'
      },
      {
        records: expensesForExport,
        handler: this._handleExpensesForExport,
        noun: pluralize('expense', expensesForExport.length),
        verb: 'export'
      }
    ]

    const activeListItems = listItems.filter(item => item.records.length > 0)

    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header">
          <div className="maha-dashboard-card-header-details">
            <h2>Finance Tasks</h2>
          </div>
          { controls }
        </div>
        <div className="maha-dashboard-card-body">
          <div className="maha-list">
            { activeListItems.map((item, index) => (
              <div className="maha-list-item maha-list-item-link" key={`finance_item_${index}`}  onClick={ item.handler }>
                <div className="maha-list-item-label">
                  <b>{ item.records.length }</b> { item.noun } to { item.verb }
                </div>
                <div className="maha-list-item-proceed">
                  <i className="fa fa-chevron-right" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  _getPanel() {
    return {
      className: 'dashboard'
    }
  }

  _handleDeposits() {
    this.context.router.history.push('/admin/finance/deposits?$filter[$and][0][status][$in][0]=pending')
  }

  _handleExpensesForReview() {
    this.context.router.history.push('/admin/finance/items?$filter[$and][0][status][$in][0]=approved')
  }

  _handleExpensesForExport() {
    this.context.router.history.push('/admin/finance/items?$filter[$and][0][status][$in][0]=reviewed')
  }

  _handlePayments() {
    this.context.router.history.push('/admin/finance/payments?$filter[$and][0][status][$in][0]=received&$filter[$and][1][method][$in][0]=cash&$filter[$and][1][method][$in][1]=check')
  }

}

const mapResources = (props, context) => ({
  payments: '/api/admin/finance/payments?$filter[$and][0][status][$in][0]=received&$filter[$and][1][method][$in][0]=cash&$filter[$and][1][method][$in][1]=check',
  deposits: '/api/admin/finance/deposits?$filter[$and][0][status][$in][0]=pending',
  expensesForReview: '/api/admin/finance/items?$filter[$and][0][status][$in][0]=approved',
  expensesForExport: '/api/admin/finance/items?$filter[$and][0][status][$in][0]=reviewed'
})

export default Container(mapResources)(AdminTasks)
