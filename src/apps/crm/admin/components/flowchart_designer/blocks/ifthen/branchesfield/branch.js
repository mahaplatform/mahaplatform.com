import { Criteria, ModalPanel, TextField } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Branch extends React.PureComponent {

  static propTypes = {
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    name: null,
    criteria: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleSave = this._handleSave.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-workflow-branchesfield-form">
          <div className="crm-workflow-branchesfield-form-header">
            Name<br />
            <TextField {...this._getTextField() } />
          </div>
          <div className="crm-workflow-branchesfield-form-body">
            <Criteria {...this._getCriteria() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getCriteria() {
    return {
      fields: [
        { label: 'Contact', fields: [
          { name: 'First Name', key: 'first_name', type: 'text' },
          { name: 'Last Name', key: 'last_name', type: 'text' },
          { name: 'Email', key: 'email', type: 'text' },
          { name: 'Phone', key: 'phone', type: 'text' },
          { name: 'Street', key: 'street_1', type: 'text' },
          { name: 'City', key: 'city', type: 'text' },
          { name: 'State/Province', key: 'state_province', type: 'text' },
          { name: 'Postal Code', key: 'postal_code', type: 'text' },
          { name: 'Birthday', key: 'birthday', type: 'text' },
          { name: 'Spouse', key: 'spouse', type: 'text' }
        ] }
      ],
      onChange: this._handleChange.bind(this, 'criteria')
    }
  }

  _getPanel() {
    return {
      title: 'Branch',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      buttons: [
        { label: 'Save', color: 'red', handler: this._handleSave }
      ]
    }
  }

  _getTextField() {
    return {
      placeholder: 'Enter a name',
      onChange: this._handleChange.bind(this, 'name')
    }
  }

  _handleCancel() {
    this.props.onCancel()
  }

  _handleDone() {}

  _handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  _handleSave() {
    this.props.onDone(this.state)
  }

}

export default Branch
