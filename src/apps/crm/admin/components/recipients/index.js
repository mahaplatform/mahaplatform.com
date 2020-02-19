import ImportToken from '../../../../maha/admin/tokens/import'
import { CriteriaDesigner, ModalPanel } from 'maha-admin'
import RecipientToken from '../../tokens/recipient'
import PropTypes from 'prop-types'
import React from 'react'

class Recipients extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    campaign: PropTypes.object,
    type: PropTypes.string
  }

  state = {
    criteria: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    if(!this.state.criteria) return null
    return (
      <ModalPanel { ...this._getPanel() }>
        <CriteriaDesigner { ...this._getCriteriaDesigner() } />
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { campaign } = this.props
    this.setState({
      criteria: campaign.to.criteria
    })
  }

  _getCriteriaDesigner() {
    const { campaign, type } = this.props
    const { program_id, purpose } = campaign
    const { criteria } = this.state
    return {
      defaultValue: criteria,
      endpoint: `/api/admin/crm/programs/${program_id}/${purpose}/${type}/recipients`,
      entity: 'contact',
      format: (recipient) => <RecipientToken recipient={recipient} channel={ type } />,
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
        ] },
        { label: 'Classifications', fields: [
          { name: 'Interest', key: 'topic_id', type: 'select', endpoint: '/api/admin/crm/topics', text: 'title', value: 'id', subject: false, comparisons: [
            { value: '$in', text: 'is interested in' },
            { value: '$nin', text: 'is not interested in' }
          ] },
          { name: 'List', key: 'list_id', type: 'select', endpoint: '/api/admin/crm/lists', text: 'title', value: 'id', subject: false, comparisons: [
            { value: '$in', text: 'is subscribed to' },
            { value: '$nin', text: 'is not subscribed to' }
          ] },
          { name: 'Organization', key: 'organization_id', type: 'select', endpoint: '/api/admin/crm/organizations', subject: false, text: 'name', value: 'id', comparisons: [
            { value: '$in', text: 'belongs to' },
            { value: '$nin', text: 'does not belong to' }
          ] },
          { name: 'Tags', key: 'tag_id', type: 'select', endpoint: '/api/admin/crm/tags', text: 'text', value: 'id', subject: false, comparisons: [
            { value: '$in', text: 'is tagged with' },
            { value: '$nin', text: 'id not tagged with' }
          ] }
        ] },
        { label: 'Activities', fields: [
          { name: 'Form', key: 'form_id', type: 'select', endpoint: '/api/admin/crm/forms', text: 'title', value: 'id', subject: false, comparisons: [
            { value: '$eq', text: 'filled out' },
            { value: '$neq', text: 'did not fill out' }
          ] },
          { name: 'Import', key: 'import_id', type: 'select', endpoint: '/api/admin/crm/imports', text: 'description', value: 'id', subject: false, format: ImportToken, comparisons: [
            { value: '$eq', text: 'was included in import' },
            { value: '$neq', text: 'was not included in import' }
          ] }
        ] }
      ],
      onChange: this._handleChange
    }
  }

  _getPanel() {
    const { campaign } = this.props
    return {
      title: 'Select Contacts',
      rightItems: [
        { label: 'Save', handler: this._handleSave }
      ],
      alert: campaign.purpose === 'marketing' ? (
        <p><strong>NOTE:</strong> Only contacts who have given their consent will receive marketing emails</p>
      ) : null
    }
  }

  _handleChange(criteria) {
    this.setState({ criteria })
  }

  _handleSave() {
    const { campaign, type } = this.props
    const { criteria } = this.state
    this.context.network.request({
      endpoint: `/api/admin/crm/campaigns/${ type }/${campaign.id}`,
      method: 'PATCH',
      body: { to: { criteria } },
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Recipients
