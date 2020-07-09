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
    physicalPayments: PropTypes.array,
    digitalPaymentsCaptured: PropTypes.array,
    digitalPaymentsSettled: PropTypes.array,
    deposits: PropTypes.array,
    expensesForReview: PropTypes.array,
    expensesForExport: PropTypes.array
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
            <h2>Finance Tasks</h2>
          </div>
          { controls }
        </div>
        <div className="maha-dashboard-card-body">
          <div className="maha-list">
            { listItems.map((item, index) => (
              <div className="maha-list-item maha-list-item-link" key={`finance_item_${index}`}  onClick={ item.handler }>
                <div className="maha-list-item-label">
                  <b>{ item.records.length }</b> { item.noun } { item.verb }
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
    const { physicalPayments, digitalPaymentsCaptured, digitalPaymentsSettled, deposits, expensesForReview, expensesForExport } = this.props

    const listItems = [
      {
        records: physicalPayments,
        handler: this._handlePhysicalPayments,
        noun: `cash/check ${pluralize('payment', physicalPayments.length)}`,
        verb: 'to deposit'
      },
      {
        records: digitalPaymentsCaptured,
        handler: this._handleDigitalPaymentsCaptured,
        noun: `digital ${pluralize('payment', digitalPaymentsCaptured.length)}`,
        verb: 'pending settlement'
      },
      {
        records: digitalPaymentsSettled,
        handler: this._handleDigitalPaymentsSettled,
        noun: `digital ${pluralize('payment', digitalPaymentsSettled.length)}`,
        verb: 'pending disbursement'
      },
      {
        records: deposits,
        handler: this._handleDeposits,
        noun: pluralize('deposit', deposits.length),
        verb: 'to export'
      },
      {
        records: expensesForReview,
        handler: this._handleExpensesForReview,
        noun: pluralize('expense', expensesForReview.length),
        verb: 'to review'
      },
      {
        records: expensesForExport,
        handler: this._handleExpensesForExport,
        noun: pluralize('expense', expensesForExport.length),
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
  physicalPayments: {
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
  digitalPaymentsCaptured: {
    endpoint: '/api/admin/finance/payments',
    query: {
      $filter: {
        status: {
          $in: ['captured']
        },
        method: {
          $in: ['ach','card','paypal','applepay','googlepay']
        }
      },
      $page: {
        limit: 0
      }
    }
  },
  digitalPaymentsSettled: {
    endpoint: '/api/admin/finance/payments',
    query: {
      $filter: {
        status: {
          $in: ['settled']
        },
        method: {
          $in: ['ach','card','paypal','applepay','googlepay']
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
    endpoint: '/api/admin/finance/items/report',
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
    endpoint: '/api/admin/finance/items/report',
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
