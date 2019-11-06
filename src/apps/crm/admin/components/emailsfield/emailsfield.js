import { Button, EmailField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class EmailsField extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.array,
    emails: PropTypes.array,
    tabIndex: PropTypes.number,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRemove: PropTypes.func,
    onSet: PropTypes.func,
    onUpdate: PropTypes.func
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    const { emails, tabIndex } = this.props
    return (
      <div className="emailsfield" tabIndex={ tabIndex }>
        { emails.map((email, index) => (
          <div className="emailsfield-email" key={ `email_${index}` }>
            <div className="emailsfield-email-field">
              <EmailField { ...this._getEmailField(email, index) } />
            </div>
            { emails.length > 1 &&
              <div className="emailsfield-email-action">
                <Button { ...this._getPrimaryButton(email, index) } />
              </div>
            }
            { emails.length > 1 &&
              <Button { ...this._getRemoveButton(index) } />
            }
          </div>
        ))}
        <div className="emailsfield-add">
          <Button { ...this._getAddButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const defaultValue = this.props.defaultValue || [
      { address: null, is_primary: true }
    ]
    this.props.onSet(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { emails } = this.props
    if(!_.isEqual(emails, prevProps.emails)) {
      this._handleChange()
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
      label: 'PRIMARY',
      className: email.is_primary ? 'ui mini blue button' : 'ui mini button',
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

  _handleChange() {
    const { emails } = this.props
    this.props.onChange(emails.filter(email => {
      return email.address !== null
    }))
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
