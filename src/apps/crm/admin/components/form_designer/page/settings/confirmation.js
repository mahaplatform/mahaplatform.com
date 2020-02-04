import * as options from '../../variables'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Security extends React.Component {

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
      this.props.onUpdate('confirmation', config)
    }
  }

  _getForm() {
    const { config } = this.state
    return {
      title: 'Confirmation Page',
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
            { label: 'Once Form is Submitted', name: 'strategy', type: 'radiogroup', options: options.strategies, defaultValue: config.strategy },
            this._getConfirmation()
          ]
        }
      ]
    }
  }

  _getDefault() {
    return {
      strategy: 'message',
      message: null,
      redirect: ''
    }
  }

  _getConfirmation() {
    const { config } = this.state
    if(config.strategy === 'message') {
      return { label: 'Message', name: 'message', type: 'htmlfield', defaultValue: config.message }
    }
    return { label: 'URL', name: 'redirect', type: 'textfield', placeholder: 'http://', defaultValue: config.redirect }
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
  config: state.crm.form_designer[props.cid].config.confirmation
})

export default connect(mapStateToProps)(Security)
