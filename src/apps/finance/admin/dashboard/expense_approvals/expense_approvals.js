import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

class ExpenseApprovals extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    controls: PropTypes.any,
    isExpanded: PropTypes.bool,
    approvals: PropTypes.array,
    rejected: PropTypes.array,
    saved: PropTypes.array,
    submitted: PropTypes.array
  }

  _handleApprovals = this._handleApprovals.bind(this)
  _handleRejected = this._handleRejected.bind(this)
  _handleSaved = this._handleSaved.bind(this)
  _handleSubmitted = this._handleSubmitted.bind(this)

  render() {
    const { controls } = this.props
    const listItems = this._getListItems()

    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header">
          <div className="maha-dashboard-card-header-details">
            <h2>Expense Approvals</h2>
          </div>
          { controls }
        </div>
        <div className="maha-dashboard-card-body">
          <div className="maha-list">
            { listItems.map((item, index) => (
              <div className={ this._getItemClass(item) } key={`finance_item_${index}`} onClick={ item.handler }>
                <div className="maha-list-item-label">
                  <b>{ item.records.length }</b> { item.text }
                </div>
                { !item.empty &&
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
    if(!item.empty) {
      itemClass = `${ itemClass } maha-list-item-link`
    } else {
      itemClass = `${ itemClass } maha-list-item-gray`
    }
    return itemClass
  }

  _getListItems() {
    const { submitted, approvals, saved, rejected } = this.props

    const listItems = [
      {
        records: approvals,
        handler: this._handleApprovals,
        text: `${ pluralize('approval', approvals.length)} that need your review`,
        empty: !this._hasApprovals()
      }, {
        records: submitted,
        handler: this._handleSubmitted,
        text: `${ pluralize('item', submitted.length)} awaiting approval`,
        empty: !this._hasSubmitted()
      }, {
        records: saved,
        handler: this._handleSaved,
        text: `incomplete/pending ${ pluralize('item', saved.length)}`,
        empty: !this._hasSaved()
      }, {
        records: rejected,
        handler: this._handleRejected,
        text: `rejected ${ pluralize('item', rejected.length)}`,
        empty: !this._hasRejected()
      }
    ]

    return listItems
  }

  _hasApprovals() {
    const { approvals } = this.props
    return typeof approvals !== 'undefined' && approvals.length > 0
  }

  _hasRejected() {
    const { rejected } = this.props
    return typeof rejected !== 'undefined' && rejected.length > 0
  }

  _hasSaved() {
    const { saved } = this.props
    return typeof saved !== 'undefined' && saved.length > 0
  }

  _hasSubmitted() {
    const { submitted } = this.props
    return typeof submitted !== 'undefined' && submitted.length > 0
  }

  _handleApprovals() {
    if(this._hasApprovals()) {
      this.context.router.history.push('/admin/finance/approvals/?$filter[$and][0][status][$in][0]=submitted')
    }
  }

  _handleRejected() {
    if(this._hasRejected()) {
      this.context.router.history.push('/admin/finance/items/?$filter[$and][0][status][$in][0]=rejected')
    }
  }

  _handleSaved() {
    if(this._hasSaved()) {
      this.context.router.history.push('/admin/finance/items/?$filter[$and][0][status][$in][0]=incomplete&$filter[$and][0][status][$in][1]=pending')
    }
  }

  _handleSubmitted() {
    if(this._hasSubmitted()) {
      this.context.router.history.push('/admin/finance/items/?$filter[$and][0][status][$in][0]=submitted')
    }
  }

}

const mapResources = (props, context) => ({
  approvals: {
    endpoint: '/api/admin/finance/approvals',
    query: {
      $filter: {
        status: {
          $in: ['submitted']
        }
      },
      $page: {
        limit: 0
      }
    }
  },
  rejected: {
    endpoint: '/api/admin/finance/items',
    query: {
      $filter: {
        status: {
          $in: ['rejected']
        }
      },
      $page: {
        limit: 0
      }
    }
  },
  submitted: {
    endpoint: '/api/admin/finance/items',
    query: {
      $filter: {
        status: {
          $in: ['submitted']
        }
      },
      $page: {
        limit: 0
      }
    }
  },
  saved: {
    endpoint: '/api/admin/finance/items',
    query: {
      $filter: {
        status: {
          $in: ['incomplete', 'pending']
        }
      },
      $page: {
        limit: 0
      }
    }
  }
})

export default Container(mapResources)(ExpenseApprovals)
