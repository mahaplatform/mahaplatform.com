import { Button, EmailField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class EmailsField extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    defaultValue: PropTypes.array,
    emails: PropTypes.array,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  _handleAdd = this._handleAdd.bind(this)

  render() {
    const { emails } = this.props
    return (
      <div className="emailsfield">
        { emails.map((email, index) => (
          <div className="emailsfield-email" key={ `email_${index}` }>
            <div className="emailsfield-email-field">
              <EmailField { ...this._getEmailField(email, index) } />
            </div>
            { emails.length > 1 &&
              <Button { ...this._getPrimaryButton(email, index) } />
            }
            { emails.length > 1 &&
              <Button { ...this._getRemoveButton(index) } />
            }
          </div>
        ))}
        <Button { ...this._getAddButton() } />
      </div>
    )
  }

  componentDidMount() {
    const defaultValue = this.props.defaultValue || [
      { address: '', is_primary: true }
    ]
    this.props.onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { emails } = this.props
    if(!_.isEqual(emails, prevProps.emails)) {
      this.props.onChange(emails)
    }
  }

  _getAddButton() {
    return {
      label: 'Add Another Email',
      className: 'link',
      handler: this._handleAdd
    }
  }

  _getEmailField(email, index) {
    return {
      defaultValue: email.address,
      onChange: this._handleUpdate.bind(this, email, index)
    }
  }

  _getPrimaryButton(email, index) {
    return {
      className: 'emailsfield-email-action',
      icon: email.is_primary ? 'check-circle' : 'circle-o',
      handler: this._handlePrimary.bind(this, email, index)
    }
  }

  _getRemoveButton(index) {
    return {
      className: 'emailsfield-email-action',
      icon: 'times',
      handler: this._handleRemove.bind(this, index)
    }
  }

  _handleAdd() {
    this.props.onAdd()
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

  _handlePrimary(email, index) {
    const value = {
      ...email,
      is_primary: true
    }
    this.props.onUpdate(index, value)
  }

  _handleUpdate(email, index, address) {
    const value = {
      ...email,
      address
    }
    this.props.onUpdate(index, value)
  }


}

export default EmailsField
