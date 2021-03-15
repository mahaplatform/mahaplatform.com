import { parsePhoneNumberFromString } from 'libphonenumber-js'
import PropTypes from 'prop-types'
import Contact from './contact'
import React from 'react'
import _ from 'lodash'

class ContactField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    contact: null
  }

  _handleBegin = this._handleBegin.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleContact = this._handleContact.bind(this)

  render() {
    const { contact } = this.state
    return (
      <div className="maha-input">
        <div className="maha-input-field" onClick={ this._handleBegin }>
          { contact ?
            <div className="maha-input-tokens">
              <div className="maha-input-token">
                <strong>{ this._getName() }</strong>
                { contact.email &&
                  <div>{ contact.email }</div>
                }
                { contact.phone &&
                  <div>{ this._getFormatted(contact.phone) }</div>
                }
                { contact.address &&
                  <div>{ contact.address.description }</div>
                }
              </div>
            </div> :
            <div className="maha-input-placeholder">
              Enter contact
            </div>
          }
        </div>
        { name &&
          <div className="maha-input-clear" onClick={ this._handleClear } >
            <i className="fa fa-times"/>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { contact } = this.state
    if(!_.isEqual(contact, prevState.contact)) {
      this._handleChange()
    }
  }

  _getFormatted(number) {
    const parsed = parsePhoneNumberFromString(number, 'US')
    const matches = parsed.number.match(/^\+1(\d{3})(\d{3})(\d{4})/)
    if(!matches) return number
    const formatted = matches.slice(1,4).join('-')
    return parsed.ext ? `${formatted} ext. ${parsed.ext}` : formatted
  }

  _getName() {
    const { first_name, last_name } = this.state.contact
    return [first_name, last_name].join(' ')
  }

  _getContact() {
    const { contact } = this.state
    return {
      contact,
      onDone: this._handleContact
    }
  }

  _handleBegin() {
    this.context.form.push(Contact, this._getContact.bind(this))
  }

  _handleChange() {
    const { contact } = this.state
    this.props.onChange(contact)
  }

  _handleClear(e) {
    e.stopPropagation()
    this.setState({
      name: null
    })
  }

  _handleContact(contact) {
    this.setState({ contact })
    this.context.form.pop()
  }

}

export default ContactField
