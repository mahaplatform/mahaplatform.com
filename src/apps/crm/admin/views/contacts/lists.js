import { ModalPanel } from 'maha-admin'
import CheckboxesField from '../../components/checkboxesfield'
import PropTypes from 'prop-types'
import React from 'react'

class Lists extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    filter: PropTypes.object
  }

  state = {
    ids: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="crm-batches">
          <CheckboxesField { ...this._getCheckboxesField() } />
        </div>
      </ModalPanel>
    )
  }

  _getCheckboxesField() {
    return {
      endpoint: '/api/admin/crm/lists',
      onChange: this._handleChange,
      value: 'id'
    }
  }

  _getPanel() {
    return {
      title: 'Add to Lists',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Save', handler: this._handleSave }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange(ids) {
    this.setState({ ids })
  }

  _handleSave() {
    const { filter } = this.props
    const { ids } = this.state
    this.context.network.request({
      endpoint: '/api/admin/crm/contacts/batch',
      method: 'post',
      body: {
        type: 'lists',
        filter,
        ids
      },
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Lists
