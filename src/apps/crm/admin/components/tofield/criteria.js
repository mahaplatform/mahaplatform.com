import { CriteriaDesigner, ModalPanel } from 'maha-admin'
import RecipientToken from '../../tokens/recipient'
import fields from '../../views/contacts/criteria'
import PropTypes from 'prop-types'
import React from 'react'

class CriteriaPicker extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.string,
    endpoint: PropTypes.string,
    instructions: PropTypes.string,
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
    const { endpoint } = this.props
    return {
      defaultValue: [],
      endpoint,
      entity: 'contact',
      fields,
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

export default CriteriaPicker
