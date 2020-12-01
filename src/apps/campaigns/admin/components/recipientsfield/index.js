import { parsePhoneNumberFromString } from 'libphonenumber-js'
import Recipient from './recipient'
import { Button } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Recipientsfield extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    users: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    defaultValue: PropTypes.array,
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    recipients: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleCreate = this._handleCreate.bind(this)

  render() {
    const { recipients } = this.state
    return (
      <div className="crm-recipientsfield">
        <div className="crm-recipientsfield-recipients">
          { recipients.map((recipient, index) => (
            <div className="crm-recipientsfield-recipient" key={`recipient_${index}`}>
              <div className="crm-recipientsfield-recipient-label">
                { recipient.strategy === 'software' &&
                  <div>
                    { this._getUser(recipient.user_id) } <span>( Maha Phone )</span>
                  </div>
                }
                { recipient.strategy === 'cell' &&
                  <div>
                    { this._getUser(recipient.user_id) } <span>( Cell Phone )</span>
                  </div>
                }
                { recipient.strategy === 'number' &&
                  <div>
                    { recipient.number }
                  </div>
                }
              </div>
              <div className="crm-recipientsfield-recipient-action" onClick={ this._handleRemove.bind(this, index)}>
                <i className="fa fa-times" />
              </div>
            </div>
          ))}
          <div className="crm-recipientsfield-recipients-add">
            <Button { ...this._getAdd() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      recipients: defaultValue
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { recipients } = this.state
    if(!_.isEqual(recipients, prevState.recipients)) {
      this.props.onChange(recipients)
    }
  }

  _getFormatted(number) {
    const phoneNumber = parsePhoneNumberFromString(number, 'US')
    return phoneNumber.formatNational()
  }

  _getAdd() {
    return {
      label: 'Add Recipient',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getRecipient() {
    const { users } = this.props
    return {
      users,
      onDone: this._handleCreate
    }
  }

  _getUser(id) {
    const { users } = this.props
    const user = _.find(users, { id })
    return user.full_name
  }

  _handleAdd() {
    this.context.form.push(Recipient, this._getRecipient())
  }

  _handleCreate(recipient) {
    const { recipients } = this.state
    this.setState({
      recipients: [
        ...recipients,
        recipient
      ]
    })
  }

  _handleRemove(remove) {
    const { recipients } = this.state
    this.setState({
      recipients: recipients.filter((recipient, index) => {
        return index !== remove
      })
    })
  }

}

export default Recipientsfield