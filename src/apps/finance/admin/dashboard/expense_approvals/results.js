import CompactTypeToken from '../../tokens/type/compact'
import { Format } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.Component {

  static contextTypes = {
    card: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    records: PropTypes.array,
    isExpanded: PropTypes.bool
  }

  render() {
    const { records, isExpanded } = this.props
    return (
      <div className="maha-list">
        { records.map((item, index) => (
          <div className="maha-list-item maha-list-item-link" key={`item_${index}`} onClick={ this._handleItem.bind(this, item) }>
            <div className="maha-list-item-token">
              <CompactTypeToken value={ item.type } />
            </div>
            <div className="maha-list-item-label">
              { item.user.full_name }, ${ item.amount } { isExpanded && `, ${item.description}` }
            </div>
            <div className="maha-list-item-data">
              <Format value={ item.created_at } format='date' />
            </div>
            <div className="maha-list-item-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _handleItem(item) {
    this.context.router.history.push(`/admin/finance/expenses/${item.id}`)
  }
}

export default Results
