import { CriteriaDesigner, ModalPanel } from 'maha-admin'
import ContactToken from '../../../tokens/contact'
import PropTypes from 'prop-types'
import React from 'react'

class Recipients extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    campaign: PropTypes.object
  }

  state = {
    to: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.to) return null
    return (
      <ModalPanel { ...this._getPanel() }>
        <CriteriaDesigner { ...this._getCriteriaDesigner() } />
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { campaign } = this.props
    this.setState({
      to: campaign.to || {}
    })
  }

  _getCriteriaDesigner() {
    const { to } = this.state
    return {
      defaultValue: to,
      endpoint: '/api/admin/crm/contacts',
      entity: 'contact',
      format: ContactToken,
      fields: [
        { label: 'Contact', fields: [
          { name: 'first name', key: 'first_name', type: 'text' },
          { name: 'last name', key: 'last_name', type: 'text' },
          { name: 'email', key: 'email', type: 'text' },
          { name: 'phone', key: 'phone', type: 'text' },
          { name: 'street_1', key: 'street_1', type: 'text' },
          { name: 'city', key: 'city', type: 'text' },
          { name: 'state/province', key: 'state_province', type: 'text' },
          { name: 'postal code', key: 'postal_code', type: 'text' },
          { name: 'birthday', key: 'birthday', type: 'text' },
          { name: 'spouse', key: 'spouse', type: 'text' },
          { name: 'tags', key: 'tag_id', type: 'select', endpoint: '/api/admin/crm/tags', text: 'text', value: 'id' },
          { name: 'organization', key: 'organization_id', type: 'select', endpoint: '/api/admin/crm/organizations', text: 'name', value: 'id' }
        ] }
      ],
      onChange: this._handleChange
    }
  }

  _getPanel() {
    return {
      title: 'Select Contacts',
      rightItems: [
        { label: 'Save', handler: this._handleSave }
      ]
    }
  }

  _handleChange(to) {
    console.log('change', to)
    this.setState({ to })
  }

  _handleSave() {
    const { campaign } = this.props
    const { to } = this.state
    this.context.network.request({
      endpoint: `/api/admin/crm/campaigns/email/${campaign.id}`,
      method: 'PATCH',
      body: { to },
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Recipients
