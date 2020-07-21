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
    counts: PropTypes.object,
    approvals: PropTypes.array
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
                  <b>{ item.count }</b> { item.text }
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
    const { approvals, counts } = this.props

    const listItems = [
      {
        count: approvals.length,
        handler: this._handleApprovals,
        text: `${ pluralize('approval', approvals.length)} that need your review`
      }, {
        count: counts.submitted_count,
        handler: this._handleSubmitted,
        text: `${ pluralize('item', counts.submitted_count)} awaiting approval`
      }, {
        count: counts.saved_count,
        handler: this._handleSaved,
        text: `incomplete/pending ${ pluralize('item', counts.saved_count)}`
      }, {
        count: counts.rejected_count,
        handler: this._handleRejected,
        text: `rejected ${ pluralize('item', counts.rejected_count)}`
      }
    ]

    return listItems
  }

  _handleApprovals() {
    this.context.router.history.push('/admin/finance/approvals/?$filter[$and][0][status][$in][0]=submitted')
  }

  _handleRejected() {
    this.context.router.history.push('/admin/finance/items/?$filter[$and][0][status][$in][0]=rejected')
  }

  _handleSaved() {
    this.context.router.history.push('/admin/finance/items/?$filter[$and][0][status][$in][0]=incomplete&$filter[$and][0][status][$in][1]=pending')
  }

  _handleSubmitted() {
    this.context.router.history.push('/admin/finance/items/?$filter[$and][0][status][$in][0]=submitted')
  }

}

const mapResources = (props, context) => ({
  counts: {
    endpoint: '/api/admin/finance/dashboard/expense_overview'
  },
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
  }
})

export default Container(mapResources)(ExpenseApprovals)
