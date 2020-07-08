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

  _getListItems = this._getListItems.bind(this)
  _handlePayments = this._handlePayments.bind(this)
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
            <h2>Finance Tasks</h2>
          </div>
          { controls }
        </div>
        <div className="maha-dashboard-card-body">
          <div className="maha-list">
            { listItems.map((item, index) => (
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

  _getListItems() {
    const { payments, deposits, expensesForReview, expensesForExport } = this.props

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
    return activeListItems
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
  payments: {
    endpoint: '/api/admin/finance/payments',
    query: {
      $filter: {
        status: {
          $in: ['received']
        },
        method: {
          $in: ['cash','check']
        }
      },
      $page: {
        limit: 0
      }
    }
  },
  deposits: {
    endpoint: '/api/admin/finance/deposits',
    query: {
      $filter: {
        status: {
          $in: ['pending']
        }
      },
      $page: {
        limit: 0
      }
    }
  },
  expensesForReview: {
    endpoint: '/api/admin/finance/items',
    query: {
      $filter: {
        status: {
          $in: ['approved']
        }
      },
      $page: {
        limit: 0
      }
    }
  },
  expensesForExport: {
    endpoint: '/api/admin/finance/items',
    query: {
      $filter: {
        status: {
          $in: ['reviewed']
        }
      },
      $page: {
        limit: 0
      }
    }
  }
})

export default Container(mapResources)(AdminTasks)
