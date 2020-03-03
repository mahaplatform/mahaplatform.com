import { ModalPanel, CriteriaDesigner }from 'maha-admin'
import ContactToken from '../../../tokens/contact'
import criteria from '../../contacts/criteria'
import PropTypes from 'prop-types'
import React from 'react'

class Enroll extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    workflow: PropTypes.object
  }

  state = {
    criteria: null
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleEnroll = this._handleEnroll.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <CriteriaDesigner { ...this._getDesigner() } />
      </ModalPanel>
    )
  }

  _getDesigner() {
    return {
      endpoint: '/api/admin/crm/workflows/contacts',
      format: ContactToken,
      fields: criteria,
      onChange: this._handleChange
    }
  }

  _getPanel() {
    return {
      title: 'Enroll Contacts',
      leftItems: [
        { label: 'Cancel', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Enroll', handler: this._handleEnroll }
      ]
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleChange(criteria) {
    this.setState({ criteria })
  }

  _handleEnroll() {
    const { workflow } = this.props
    const { criteria } = this.state
    this.context.network.request({
      endpoint: `/api/admin/crm/workflows/${workflow.id}/enroll`,
      method: 'patch',
      body: { criteria },
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}
export default Enroll
