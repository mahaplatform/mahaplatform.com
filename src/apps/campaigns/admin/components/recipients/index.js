import { CriteriaDesigner, ModalPanel } from 'maha-admin'
import fields from '../../views/contacts/criteria'
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
      criteria: campaign.to
    })
  }

  _getCriteriaDesigner() {
    const { campaign, type } = this.props
    const { program, purpose } = campaign
    const { criteria } = this.state
    return {
      defaultValue: criteria,
      endpoint: `/api/admin/crm/programs/${program.id}/${purpose}/${type}/recipients`,
      entity: 'contact',
      format: (recipient) => <RecipientToken recipient={recipient} channel={ type } />,
      fields,
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
      endpoint: `/api/admin/campaigns/${ type }/${campaign.id}`,
      method: 'PATCH',
      body: { to: criteria },
      onSuccess: this._handleSuccess
    })
  }

  _handleSuccess() {
    this.context.modal.close()
  }

}

export default Recipients
