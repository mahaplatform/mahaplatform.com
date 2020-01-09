import { Infinite, Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Contacts extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    source: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  state = {
    conatcts: []
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
    const { source } = this.props
    const empty = {
      icon: 'user',
      title: 'No Contacts',
      text: 'There are no contacts available'
    }
    return {
      endpoint: `/api/admin/profiles/${source.id}/contacts`,
      layout: Results,
      empty: <Message {...empty} />
    }
  }

  _handleCancel() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onDone()
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
            { contact.photo &&
              <div className="contactimport-contact-avatar">
                <img src={ contact.photo } />
              </div>
            }
            <div className="contactimport-contact-label">
              <strong>{ contact.first_name } { contact.last_name }</strong><br />
              { contact.email_addresses.length > 0 ? contact.email_addresses[0].address: 'no email' }
            </div>
          </div>
        )) }
      </div>
    )
  }

}

export default Contacts
