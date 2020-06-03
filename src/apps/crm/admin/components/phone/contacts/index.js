import { Infinite, Searchbox} from 'maha-admin'
import PropTypes from 'prop-types'
import Results from './results'
import React from 'react'

class Contacts extends React.Component {

  static contextTypes = {
  }

  static propTypes = {
    programs: PropTypes.array
  }

  state = {
    q: ''
  }

  _handleQuery = this._handleQuery.bind(this)

  render() {
    return (
      <div className="maha-phone-contacts">
        <div className="maha-phone-contacts-header">
          <Searchbox { ...this._getSearchBox() } />
        </div>
        <div className="maha-phone-contacts-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getInfinite() {
    const { q } = this.state
    return {
      endpoint: '/api/admin/crm/contacts',
      filter: {
        ...q.length > 0 ? { q } : {},
        phone: {
          $nnl: true
        }
      },
      layout: Results
    }
  }

  _getPrograms() {
    const { programs } = this.props
    return {
      programs
    }
  }

  _getSearchBox() {
    return {
      onChange: this._handleQuery
    }
  }

  _handleQuery(q) {
    this.setState({ q })
  }

}

export default Contacts
