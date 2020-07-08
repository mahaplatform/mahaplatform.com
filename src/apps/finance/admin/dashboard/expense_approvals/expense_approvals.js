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
    items: PropTypes.array
  }

  _getItemLabel = this._getItemLabel.bind(this)
  _getItemClass = this._getItemClass.bind(this)
  _getListItems = this._getListItems.bind(this)
  _hasApprovals = this._hasApprovals.bind(this)
  _hasItems = this._hasItems.bind(this)
  _handleApprovals = this._handleApprovals.bind(this)
  _handleItems = this._handleItems.bind(this)

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
                  { this._getItemLabel(item) }
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

  _getItemLabel(item) {
    console.log(item)
    if(!item.empty) {
      return (
        <span>
          You have <b>{ item.records.length }</b> { item.noun } { item.verb }
        </span>
      )
    } else {
      return (
        <span>
          You have no { item.noun } { item.verb }
        </span>
      )
    }
  }

  _getItemClass(item) {
    let itemClass = 'maha-list-item'
    if(!item.empty) {
      return `${ itemClass } maha-list-item-link`
    } else {
      return itemClass
    }
  }

  _getListItems() {
    const { items, approvals } = this.props

    const listItems = [
      {
        records: approvals,
        handler: this._handleApprovals,
        noun: pluralize('approval', approvals.length),
        verb: 'that need your review',
        empty: !this._hasApprovals()
      }, {
        records: items,
        handler: this._handleItems,
        noun: pluralize('item', items.length),
        verb: 'awaiting approval',
        empty: !this._hasItems()
      }
    ]

    return listItems
  }

  _hasApprovals() {
    const { approvals } = this.props
    return typeof approvals !== 'undefined' && approvals.length > 0
  }

  _hasItems() {
    const { items } = this.props
    return typeof items !== 'undefined' && items.length > 0
  }

  _handleApprovals() {
    if(this._hasApprovals()) {
      this.context.router.history.push('/admin/finance/approvals/?$filter[$and][0][status][$in][0]=submitted')
    }
  }

  _handleItems() {
    if(this._hasItems()) {
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
  items: {
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
  }
})

export default Container(mapResources)(ExpenseApprovals)
