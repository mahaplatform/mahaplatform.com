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
    saved: PropTypes.array,
    submitted: PropTypes.array
  }

  _handleApprovals = this._handleApprovals.bind(this)
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
    const { submitted, approvals, saved } = this.props

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
        handler: this._handleSubmitted,
        text: `incomplete/pending ${ pluralize('item', submitted.length)}`,
        empty: !this._hasSubmitted()
      }
    ]

    return listItems
  }

  _hasApprovals() {
    const { approvals } = this.props
    return typeof approvals !== 'undefined' && approvals.length > 0
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

  _handleSubmitted() {
    if(this._hasSubmitted()) {
      this.context.router.history.push('/admin/finance/items/?$filter[$and][0][status][$in][0]=submitted')
    }
  }

  _handleSaved() {
    if(this._hasSaved()) {
      this.context.router.history.push('/admin/finance/items/?$filter[$and][0][status][$in][0]=incomplete&$filter[$and][0][status][$in][1]=pending')
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
