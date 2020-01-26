import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Settings extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    onUpdate: PropTypes.func
  }

  state = {
    config: null
  }

  _handleChange = this._handleChange.bind(this)

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
      this.props.onUpdate('settings', config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      showHeader: false,
      onChange: this._handleChange,
      sections: [
        {
          fields: [
            { label: 'Captcha', name: 'captcha', type: 'checkbox', prompt: 'Include CAPTCHA?', defaultValue: config.captcha },
            { label: 'Submit Text', name: 'submit_text', type: 'textfield', defaultValue: config.submit_text }
          ]
        }, {
          label: 'Confirmation',
          fields: [
            { name: 'confirmation_strategy', type: 'radiogroup', options: [
              { value: 'message', text: 'Show Message' },
              { value: 'redirect', text: 'Redirect to website' }
            ], defaultValue: config.confirmation_strategy },
            this._getConfirmation()
          ]
        }, {
          label: 'Limits',
          fields: [
            { label: 'Max Submissions', name: 'max_submissions', type: 'numberfield', defaultValue: config.max_submissions },
            { label: 'Start Date', name: 'start_date', type: 'datefield', defaultValue: config.start_date },
            { label: 'End Date', name: 'end_date', type: 'datefield', defaultValue: config.end_date }
          ]
        }, {
          label: 'Form Closed',
          fields: [
            { name: 'closed_strategy', type: 'radiogroup', options: [
              { value: 'message', text: 'Show Message' },
              { value: 'redirect', text: 'Redirect to website' }
            ], defaultValue: config.closed_strategy },
            this._getClosed()
          ]
        }
      ]
    }
  }

  _getClosed() {
    const { config } = this.state
    if(config.closed_strategy === 'message') {
      return { label: 'Message', name: 'closed_message', type: 'htmlfield', defaultValue: config.closed_message }
    }
    return { label: 'URL', name: 'closed_redirect', type: 'textfield', placeholder: 'http://', defaultValue: config.closed_redirect }
  }

  _getConfirmation() {
    const { config } = this.state
    if(config.confirmation_strategy === 'message') {
      return { label: 'Message', name: 'confirmation_message', type: 'htmlfield', defaultValue: config.confirmation_message }
    }
    return { label: 'URL', name: 'confirmation_redirect', type: 'textfield', placeholder: 'http://', defaultValue: config.confirmation_redirect }
  }

  _getDefault() {
    return {
      captcha: null,
      submit_text: 'Submit',
      confirmation_strategy: null,
      confirmation_message: null,
      confirmation_redirect: null,
      max_submissions: null,
      start_date: null,
      end_date: null,
      closed_strategy: null,
      closed_message: null,
      closed_redirect: null,
      line_height: null,
      letter_spacing: null
    }
  }

  _handleChange(config) {
    this.setState({
      config: {
        ...this.state.config,
        ...config
      }
    })
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.form_designer[props.cid].config.settings
})

export default connect(mapStateToProps)(Settings)
