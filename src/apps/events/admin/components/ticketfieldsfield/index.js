import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

const core = [
  { label: 'Gender', name: 'gender', type: 'radigroup' },
  { label: 'Age', name: 'age', type: 'dropdown' },
  { label: 'Race', name: 'race', type: 'checkboxes' },
  { label: 'Ethnicity', name: 'ethnicity', type: 'radiogroup' }
]

class TicketFieldsField extends React.PureComponent {

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
      <div className="ticketfieldsfield">
        <div className="ticketfieldsfield-field">
          <div className="ticketfieldsfield-field-label">
            Name <span>(textfield)</span>
          </div>
        </div>
        { core.map((field, index) => (
          <div className="ticketfieldsfield-field" key={`field_${index}`}>
            <div className="ticketfieldsfield-field-label">
              { field.label } <span>({ field.type })</span>
            </div>
            <div className="ticketfieldsfield-field-action" onClick={ this._handleToggle.bind(this, field)}>
              <i className="fa fa-toggle-on" />
            </div>
          </div>
        ))}
        { custom.map((field, index) => (
          <div className="ticketfieldsfield-field" key={`field_${index}`}>
            <div className="ticketfieldsfield-field-label" onClick={ this._handleRemove.bind(this, index)}>
              { field.label } <span>({ field.type })</span>
            </div>
            <div className="ticketfieldsfield-field-action">
              <i className="fa fa-times" />
            </div>
          </div>
        ))}
        <div className="ticketfieldsfield-add">
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


export default TicketFieldsField
