import { Container, CriteriaDesigner, ModalPanel } from '@admin'
import criteria from '@apps/crm/admin/views/contacts/criteria'
import RecipientToken from '../../tokens/recipient'
import PropTypes from 'prop-types'
import React from 'react'

class Picker extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.string,
    defaultValue: PropTypes.object,
    endpoint: PropTypes.string,
    fields: PropTypes.array,
    instructions: PropTypes.string,
    program: PropTypes.object,
    program_id: PropTypes.number,
    purpose: PropTypes.string,
    onDone: PropTypes.func
  }

  state = {
    criteria: []
  }

  _handleBack = this._handleBack.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <CriteriaDesigner { ...this._getCriteriaDesigner() } />
      </ModalPanel>
    )
  }

  _getCriteriaDesigner() {
    const { defaultValue, endpoint, fields, program } = this.props
    return {
      defaultValue: defaultValue ? defaultValue.criteria : null,
      endpoint,
      entity: 'contact',
      fields: criteria([{
        ...program,
        fields
      }]),
      format: (recipient) => <RecipientToken recipient={ recipient } />,
      onChange: this._handleChange
    }
  }

  _getPanel() {
    const { instructions } = this.props
    const { criteria } = this.state
    return {
      title: 'Select Criteria',
      instructions,
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: criteria.length > 1 ? [
        { label: 'Done', handler: this._handleDone }
      ] : null
    }
  }

  _handleBack() {
    this.context.form.pop()
  }

  _handleChange(criteria) {
    this.setState({ criteria })
  }

  _handleDone() {
    const { criteria } = this.state
    this.props.onDone({ criteria })
    this.context.form.pop()
  }

}

const mapResources = (props, context) => ({
  fields: `/api/admin/crm/programs/${props.program_id}/fields`,
  program: `/api/admin/crm/programs/${props.program_id}`
})

export default Container(mapResources)(Picker)
