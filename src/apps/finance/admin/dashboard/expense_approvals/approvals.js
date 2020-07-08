import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

class Approvals extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    approvals: PropTypes.array
  }

  _handleApprovals = this._handleApprovals.bind(this)

  render() {
    const { approvals } = this.props
    return (
      <div>
        <h3>Your Approvals</h3>
        { typeof approvals !== 'undefined' && approvals.length > 0 &&
          <h4>There are <b>{ approvals.length }</b> { pluralize('approvals', approvals.length) } awaiting your review</h4>
        }
        { typeof approvals !== 'undefined' && approvals.length === 0 &&
          <h4>You&apos;re all caught up! There are no { pluralize('approvals', approvals.length) } awaiting your review.</h4>
        }
      </div>
    )
  }

  _handleApprovals() {
    this.context.router.history.push('/admin/finance/approvals/?$filter[$and][0][status][$in][0]=submitted')
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
  }
})

export default Container(mapResources)(Approvals)
