import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

class Items extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    items: PropTypes.array
  }

  _handleItems = this._handleItems.bind(this)

  render() {
    const { items } = this.props
    return (
      <div>
        <h3>Your Expenses</h3>

        { typeof items !== 'undefined' && items.length > 0 &&
          <h4>You have <b>{ items.length }</b> { pluralize('items', items.length) } awaiting review</h4>
        }
        { typeof items !== 'undefined' && items.length === 0 &&
          <h4>You have no { pluralize('items', items.length) } awaiting review</h4>
        }
      </div>
    )
  }

  _handleItems() {
    this.context.router.history.push('/admin/finance/items/?$filter[$and][0][status][$in][0]=submitted')
  }
}

const mapResources = (props, context) => ({
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

export default Container(mapResources)(Items)
