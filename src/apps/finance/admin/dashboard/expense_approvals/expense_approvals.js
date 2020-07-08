import { Infinite, Container } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Results from './results'
import React from 'react'

class ExpenseApprovals extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    controls: PropTypes.any,
    items: PropTypes.array,
    isExpanded: PropTypes.bool
  }

  render() {
    const { controls, items } = this.props

    return (
      <div className="maha-dashboard-card">
        <div className="maha-dashboard-card-header">
          <div className="maha-dashboard-card-header-details">
            <h2>Expense Approvals</h2>
            <h3>You have { items.length } { pluralize('approval', items.length) }</h3>
          </div>
          { controls }
        </div>
        <div className="maha-dashboard-card-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { config, isExpanded } = this.props
    return {
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
      },
      layout: Results,
      props: {
        config,
        isExpanded
      }
    }
  }
}

const mapResources = (props, context) => ({
  items: '/api/admin/finance/approvals'
})

export default Container(mapResources)(ExpenseApprovals)
