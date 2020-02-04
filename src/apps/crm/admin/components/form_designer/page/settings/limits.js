import * as options from '../../variables'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Limits extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleReset = this._handleReset.bind(this)

  render() {
    if(!this.state.config) return null
    return <Form { ...this._getForm() } />
  }

  componentDidMount() {
    this.setState({
      config: {
        ...this._getDefault(),
        ...this.props.config
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { config } = this.state
    if(!_.isEqual(config, prevState.config)) {
      this.props.onUpdate('limits', config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Limits',
      onCancel: this._handleDone,
      onChange: this._handleChange,
      cancelIcon: 'chevron-left',
      saveText: null,
      buttons: [
        { label: 'Done', color: 'red', handler: this._handleDone }
      ],
      sections: [
        {
          fields: [
            { label: 'Max Responses', name: 'max_responses', type: 'numberfield', defaultValue: config.max_responses },
            { type: 'fields', fields: [
              { label: 'Start Date', name: 'start_date', type: 'datefield', defaultValue: config.start_date },
              { label: 'End Date', name: 'end_date', type: 'datefield', defaultValue: config.end_date }
            ] },
            { label: 'Once Closed', name: 'closed_strategy', type: 'radiogroup', options: options.strategies, defaultValue: config.closed_strategy },
            this._getClosed()
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      max_responses: null,
      start_date: null,
      end_date: null,
      closed_strategy: 'message',
      closed_message: null,
      closed_redirect: ''
    }
  }

  _getClosed() {
    const { config } = this.state
    if(config.closed_strategy === 'message') {
      return { label: 'Message', name: 'closed_message', type: 'htmlfield', defaultValue: config.closed_message }
    }
    return { label: 'URL', name: 'closed_redirect', type: 'textfield', placeholder: 'http://', defaultValue: config.closed_redirect }
  }

  _handleChange(config) {
    this.setState({
      config: {
        ...this.state.config,
        ...config
      }
    })
  }

  _handleDone() {
    this.props.onPop()
  }

  _handleReset() {
    this.setState({
      config: this._getDefault()
    })
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.form_designer[props.cid].config.limits
})

export default connect(mapStateToProps)(Limits)
