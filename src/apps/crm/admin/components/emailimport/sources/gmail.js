import { Container, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import Email from './email'
import React from 'react'
import _ from 'lodash'

class Gmail extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    emails: PropTypes.array,
    source: PropTypes.object,
    onDone: PropTypes.func,
    onFetch: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    selected: []
  }

  _handleBack = this._handleBack.bind(this)
  _handleImport = this._handleImport.bind(this)

  render() {
    const { emails } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="emailimport-emails">
          { emails.map((email, index) => (
            <div key={`email_${index}`} className={ this._getClass(email) } onClick={ this._handleSelect.bind(this, email) }>
              <div className="emailimport-email-icon">
                <i className={`fa fa-${this._getIcon(email)}`} />
              </div>
              <div className="emailimport-email-details">
                <Email { ...this._getEmail(email) } />
              </div>
            </div>
          ))}
        </div>
      </ModalPanel>
    )
  }

  _getClass(email) {
    const { selected } = this.state
    const classes = ['emailimport-email']
    if(_.includes(selected, email.id)) classes.push('selected')
    return classes.join(' ')
  }

  _getEmail(email) {
    return { email }
  }

  _getIcon(email) {
    const { selected } = this.state
    return _.includes(selected, email.id) ? 'check-circle' : 'circle-o'
  }

  _getPanel() {
    const { selected } = this.state
    return {
      title: 'Choose Email Source',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: selected.length > 0 ? [
        { label: 'Import', handler: this._handleImport }
      ] : []
    }
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleImport() {
  }

  _handleSelect(email) {
    const { selected } = this.state
    this.setState({
      selected: [
        ..._.xor(selected, [email.id])
      ]
    })
  }

}

const mapResources = (props, context) => ({
  emails: {
    endpoint: `/api/admin/profiles/${props.source.id}/email/received`,
    query: {
      email: props.contact.email_addresses[0].address
    }
  }
})

export default Container(mapResources)(Gmail)
