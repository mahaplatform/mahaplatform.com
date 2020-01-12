import { Infinite, Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Import from './import'
import React from 'react'

class Members extends React.PureComponent {

  static propTypes = {
    source: PropTypes.object,
    list_id: PropTypes.string,
    onDone: PropTypes.func,
    onBack: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Infinite { ...this._getInfinite() } />
      </ModalPanel>
    )
  }

  _getImport() {
    const { source, list_id, onDone } = this.props
    return {
      source,
      list_id,
      onDone
    }
  }

  _getPanel() {
    return {
      title: 'Import Contacts',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Import', handler: this._handleDone }
      ]
    }
  }

  _getInfinite() {
    const { source, list_id } = this.props
    const empty = {
      icon: 'user',
      title: 'No Contacts',
      text: 'There are no contacts available'
    }
    return {
      endpoint: `/api/admin/profiles/${source.id}/lists/${list_id}/members`,
      layout: Results,
      empty: <Message {...empty} />
    }
  }

  _handleCancel() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onPush(Import, this._getImport())
  }

}

class Results extends React.PureComponent {

  static propTypes = {
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="contactimport-contacts">
        { records.map((contact, index) => (
          <div className="contactimport-contact" key={`contact_${index}`}>
            <div className="contactimport-contact-label">
              { contact.first_name } { contact.last_name } (
              { contact.email_addresses.length > 0 ? contact.email_addresses[0].address: 'no email' }
              )
            </div>
          </div>
        )) }
      </div>
    )
  }

}

export default Members
