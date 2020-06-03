import { Infinite, Searchbox } from 'maha-admin'
import PropTypes from 'prop-types'
import Contact from './contact'
import Results from './results'
import React from 'react'

class Contacts extends React.Component {

  static propTypes = {
    program: PropTypes.object,
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

  _getContact(contact) {
    const { program, onPop } = this.props
    return {
      program,
      contact,
      onPop
    }
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
      layout: Results,
      props: {
        onChoose: this._handleChoose
      }
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

  _handleChoose(contact) {
    this.props.onPush(Contact, this._getContact(contact))
  }

  _handleQuery(q) {
    this.setState({ q })
  }

}

export default Contacts
