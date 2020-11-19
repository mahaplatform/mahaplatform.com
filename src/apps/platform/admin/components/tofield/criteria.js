import { AccountToken, AppToken, CriteriaDesigner, ModalPanel, TeamToken } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class CriteriaPicker extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.string,
    defaultValue: PropTypes.object,
    endpoint: PropTypes.string,
    fields: PropTypes.array,
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
    const { defaultValue, endpoint } = this.props
    return {
      defaultValue: defaultValue ? defaultValue.criteria : null,
      endpoint,
      entity: 'account',
      fields: [
        {
          label: 'Account',
          fields: [
            { name: 'Team', key: 'team_id', type: 'select', endpoint: '/api/admin/platform/teams', filter: { is_active: { $eq: 'true' } }, text: 'title', value: 'id', multiple: true, subject: true, format: TeamToken },
            { name: 'Apps', key: 'app_id', type: 'select', endpoint: '/api/admin/platform/apps', text: 'title', value: 'id', multiple: true, subject: true, format: AppToken }
          ]
        }
      ],
      format: (account) => <AccountToken { ...account } />,
      onChange: this._handleChange
    }
  }

  _getPanel() {
    const { criteria } = this.state
    return {
      title: 'Select Criteria',
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
