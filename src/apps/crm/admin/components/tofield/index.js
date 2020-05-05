import { RadioGroup } from 'maha-admin'
import { toFilter } from './utils'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Contacts from './contacts'
import Criteria from './criteria'
import Filter from './filter'
import List from './list'
import React from 'react'
import _ from 'lodash'

const strategies = [
  { strategy: 'criteria', text: 'Contacts that meet custom criteria', component: Criteria, placeholder: 'Choose criteria' },
  { strategy: 'filter', text: 'Contacts in a saved filter', component: Filter, placeholder: 'Choose a filter' },
  { strategy: 'list', text: 'Contacts in a list', component: List, placeholder: 'Choose a list' },
  { strategy: 'contacts', text: 'Specific contacts', component: Contacts, placeholder: 'Choose contacts' }
]

class ToField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.string,
    defaultValue: PropTypes.object,
    program_id: PropTypes.number,
    purpose: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  state = {
    strategy: 'criteria',
    config: null,
    recipients: null
  }

  _handleClear = this._handleClear.bind(this)
  _handleConfig = this._handleConfig.bind(this)
  _handlePicker = this._handlePicker.bind(this)
  _handleStrategy = this._handleStrategy.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    const { recipients, strategy } = this.state
    return (
      <div className="tofield">
        <RadioGroup { ...this._getStrategy() } />
        { strategy &&
          <div className="maha-input" onClick={ this._handlePicker }>
            <div className="maha-input-field">
              { recipients ?
                <div className="maha-input-token">
                  { pluralize('contact', recipients.length, true) }
                </div> :
                <div className="maha-input-placeholder">
                  { this._getPlaceholder() }
                </div>
              }
            </div>
            { recipients &&
              <div className="maha-input-clear" onClick={ this._handleClear }>
                <i className="fa fa-times" />
              </div>
            }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState(defaultValue)
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { config } = this.state
    if(!_.isEqual(config, prevState.config) && config) {
      this._handleFetch()
    }
  }

  _getEndpoint() {
    const { channel, program_id, purpose } = this.props
    return`/api/admin/crm/programs/${program_id}/${purpose}/${channel}/recipients`
  }

  _getInstructions() {
    const { purpose } = this.props
    if(purpose === 'marketing') {
      return `
        Marketing emails can only be sent to contacts who have given their
        explicit consent. You will only see contacts who match your criteria
        and have opted in to receive email from this program
      `
    }
    if(purpose === 'transactional') {
      return `
        Transactional emails will be sent to the primary email address of each
        contact that matches your criteria.
      `
    }
  }

  _getPicker() {
    const { channel, program_id, purpose } = this.props
    const { config } = this.state
    return {
      channel,
      defaultValue: config,
      endpoint: this._getEndpoint(),
      instructions: this._getInstructions(),
      program_id,
      purpose,
      onDone: this._handleConfig
    }
  }

  _getPickerComponent() {
    const { strategy } = this.state
    const item = _.find(strategies, { strategy })
    return item.component
  }

  _getPlaceholder() {
    const { strategy } = this.state
    const item = _.find(strategies, { strategy })
    return item.placeholder
  }

  _getStrategy() {
    const { strategy } = this.state
    return {
      defaultValue: strategy,
      options: strategies.map(({ strategy, text }) => ({
        value: strategy,
        text
      })),
      placeholder: 'Choose a strategy',
      value: 'value',
      text: 'text',
      onChange: this._handleStrategy
    }
  }

  _handleClear() {
    this.setState({
      recipients: null
    })
  }

  _handleConfig(config) {
    this.setState({ config })
  }

  _handleFetch() {
    this.context.network.request({
      endpoint: this._getEndpoint(),
      method: 'get',
      query: this._getQuery(),
      onSuccess: this._handleSuccess
    })
  }

  _getQuery() {
    const { strategy, config } = this.state
    if(strategy !== 'criteria') return config
    return {
      $filter: toFilter(config.criteria)
    }
  }

  _handlePicker() {
    const Picker = this._getPickerComponent()
    this.context.form.push(<Picker { ...this._getPicker() } />)
  }

  _handleStrategy(strategy) {
    this.setState({
      strategy,
      config: null,
      recipients: null
    })
  }

  _handleSuccess({ data }) {
    this.setState({
      recipients: data
    })
  }

}

export default ToField
