import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Settings extends React.Component {

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object,
    program_id: PropTypes.number,
    onPop: PropTypes.func,
    onTokens: PropTypes.func,
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
    const { program_id, onTokens } = this.props
    const { config } = this.state
    const tokens = {
      label: 'You can use the these tokens',
      className: 'link',
      handler: onTokens
    }
    return {
      showHeader: false,
      onChange: this._handleChange,
      sections: [
        {
          fields: [
            { label: 'From', name: 'sender_id', type: 'lookup', placeholder: 'Choose a sender', endpoint: `/api/admin/crm/programs/${program_id}/senders`, filter: { is_verified: { $eq: true } }, value: 'id', text: 'rfc822', required: true, defaultValue: config.sender_id },
            { label: 'Reply To', name: 'reply_to', type: 'textfield', placeholder: 'Enter a reply to email address', defaultValue: config.reply_to },
            { label: 'CC', name: 'cc', type: 'textfield', placeholder: 'Enter comma separated list of emails', defaultValue: config.cc },
            { label: 'BCC', name: 'bcc', type: 'textfield', placeholder: 'Enter comma separated list of emails', defaultValue: config.bcc },
            { label: 'Subject', name: 'subject', type: 'textfield', emojis: true, after: <Button { ...tokens } />, placeholder: 'Enter a subject', required: true, defaultValue: config.subject },
            { label: 'Preview Text', name: 'preview_text', type: 'textarea', maxLength: 150, rows: 1, placeholder: 'Enter preview text', defaultValue: config.preview_text }
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      sender_id: null,
      reply_to: '',
      subject: '',
      preview_text: ''
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
  config: state.maha.designer[props.cid].config.settings
})

export default connect(mapStateToProps)(Settings)
