import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class ContactFieldsField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    hidden: [],
    custom: [
      { label: 'Custom Field 1', name: 'field_1', type: 'textfield' },
      { label: 'Custom Field 2', name: 'field_2', type: 'checkboxes' },
      { label: 'Custom Field 3', name: 'field_3', type: 'dropdown' }
    ]
  }

  _handleNew = this._handleNew.bind(this)

  render() {
    const { custom } = this.state
    return (
      <div className="contactfieldsfield">
        <div className="contactfieldsfield-field">
          <div className="contactfieldsfield-field-label">
            First Name <span>(textfield)</span>
          </div>
        </div>
        <div className="contactfieldsfield-field">
          <div className="contactfieldsfield-field-label">
            Last Name <span>(textfield)</span>
          </div>
        </div>
        <div className="contactfieldsfield-field">
          <div className="contactfieldsfield-field-label">
            Email <span>(emailfield)</span>
          </div>
        </div>
        { custom.map((field, index) => (
          <div className="contactfieldsfield-field" key={`field_${index}`}>
            <div className="contactfieldsfield-field-label" onClick={ this._handleRemove.bind(this, index)}>
              { field.label } <span>({ field.type })</span>
            </div>
            <div className="contactfieldsfield-field-action">
              <i className="fa fa-times" />
            </div>
          </div>
        ))}
        <div className="contactfieldsfield-add">
          <Button { ...this._getButton() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  _getButton() {
    return {
      label: 'Add field',
      className: 'link',
      handler: this._handleNew
    }
  }

  _handleNew() {}

  _handleRemove() {}

  _handleToggle() {}

}


export default ContactFieldsField
