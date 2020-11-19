import { toFilter } from './utils'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Criteria from './criteria'
import React from 'react'
import _ from 'lodash'

class ToField extends React.PureComponent {

  static contextTypes = {
    form: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.string,
    defaultValue: PropTypes.object,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValid: PropTypes.func
  }

  state = {
    config: null,
    recipients: null
  }

  _handleClear = this._handleClear.bind(this)
  _handleConfig = this._handleConfig.bind(this)
  _handlePicker = this._handlePicker.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    const { recipients } = this.state
    return (
      <div className="maha-input" onClick={ this._handlePicker }>
        <div className="maha-input-field">
          { recipients && recipients.length > 0 ?
            <div className="maha-input-token">
              { pluralize('account', recipients.length, true) }
            </div> :
            <div className="maha-input-placeholder">
              Choose criteria
            </div>
          }
        </div>
        { recipients &&
          <div className="maha-input-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState(defaultValue)
    this.props.onReady(this._handleValidate)
  }

  componentDidUpdate(prevProps, prevState) {
    const { config, strategy } = this.state
    if(!_.isEqual(config, prevState.config) && config) {
      this._handleChange()
      this._handleFetch()
    }
    if(strategy !== prevState.strategy) {
      this._handleChange()
      this._handleFetch()
    }
  }

  _getPicker() {
    const { channel } = this.props
    const { config } = this.state
    return {
      channel,
      defaultValue: config,
      endpoint: '/api/admin/platform/accounts',
      onDone: this._handleConfig
    }
  }

  _getQuery() {
    const { config } = this.state
    return {
      $filter: toFilter(config.criteria)
    }
  }

  _handleChange() {
    const { config } = this.state
    this.props.onChange(config)
  }

  _handleClear(e) {
    e.stopPropagation()
    this.setState({
      recipients: null
    })
  }

  _handleConfig(config) {
    this.setState({ config })
  }

  _handleFetch() {
    this.context.network.request({
      endpoint: '/api/admin/platform/accounts',
      method: 'get',
      query: this._getQuery(),
      onSuccess: this._handleSuccess
    })
  }

  _handlePicker() {
    this.context.form.push(<Criteria { ...this._getPicker() } />)
  }

  _handleSuccess({ data }) {
    this.setState({
      recipients: data
    })
  }

  _handleValidate() {
    const { config, recipients } = this.state
    const { required, onValid } = this.props
    if(required && (!recipients || recipients.length === 0)) {
      return onValid(null, ['You must choose at least 1 recipient'])
    }
    onValid(config)
  }

}

export default ToField
