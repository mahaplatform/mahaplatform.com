import { Infinite, Searchbox } from '@admin'
import PropTypes from 'prop-types'
import Contact from './contact'
import Results from './results'
import React from 'react'

class Contacts extends React.Component {

  static propTypes = {
    program: PropTypes.object,
    onCall: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    q: ''
  }

  _handleChoose = this._handleChoose.bind(this)
  _handleQuery = this._handleQuery.bind(this)

  render() {
    return (
      <div className="maha-phone-search">
        <div className="maha-phone-search-header">
          <Searchbox { ...this._getSearchBox() } />
        </div>
        <div className="maha-phone-search-body">
          <Infinite { ...this._getInfinite() } />
        </div>
      </div>
    )
  }

  _getContact(contact) {
    const { program, onCall, onPop, onPush } = this.props
    return {
      program,
      contact_id: contact.id,
      phone_id: contact.phone_id,
      onCall,
      onPop,
      onPush
    }
  }

  _getInfinite() {
    const { q } = this.state
    return {
      endpoint: '/api/admin/crm/contacts',
      filter: {
        ...q.length > 0 ? { q } : {}
      },
      layout: Results,
      props: {
        onChoose: this._handleChoose
      }
    }
  }

  _getSearchBox() {
    return {
      onChange: this._handleQuery
    }
  }

  _handleChoose(contact) {
    this.props.onPush(Contact, this._getContact(contact))
  }

  _handleQuery(q) {
    this.setState({ q })
  }

}

export default Contacts
