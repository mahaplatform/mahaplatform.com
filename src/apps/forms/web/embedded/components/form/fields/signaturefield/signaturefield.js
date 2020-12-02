import PropTypes from 'prop-types'
import { Button } from '@client'
import Sign from './sign'
import React from 'react'
import _ from 'lodash'

class SignatureField extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    agreement: PropTypes.object,
    agreement_status: PropTypes.string,
    asset_id: PropTypes.number,
    cid: PropTypes.string,
    defaultValue: PropTypes.string,
    description: PropTypes.string,
    profile_id: PropTypes.number,
    prompt: PropTypes.string,
    required: PropTypes.bool,
    signed: PropTypes.bool,
    status: PropTypes.string,
    tokens: PropTypes.object,
    tabIndex: PropTypes.number,
    value: PropTypes.string,
    onCreateAgreement: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onSigned: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    prompt: 'Sign Document',
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
    value: null
  }

  _handleSigned = this._handleSigned.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { value } = this.state
    if(value === null) return null
    return (
      <div className="maha-signaturefield">
        <Button { ...this._getButton() } />
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    this.setState({
      value: !_.isNil(defaultValue) ? parseInt(defaultValue) : 0
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { status, signed } = this.props
    if(signed !== prevProps.signed) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getButton() {
    const { prompt } = this.props
    const disabled = this._getDisabled()
    return {
      label: prompt,
      disabled,
      className: disabled ? 'ui button' : 'ui black button',
      modal: <Sign { ...this._getSign() } />
    }
  }

  _getDisabled() {
    const { tokens } = this.props
    const { first_name, last_name, email } = tokens
    return (!first_name || !last_name || !email)
  }

  _getSign() {
    const { asset_id, cid, profile_id, tokens, onCreateAgreement } = this.props
    const { first_name, last_name, email } = tokens
    return {
      asset_id,
      cid,
      first_name,
      last_name,
      email,
      profile_id,
      onCreateAgreement,
      onDone: this._handleSigned
    }
  }

  _handleChange() {
    const { agreement, signed } = this.props
    this.props.onChange(signed ? agreement.id : null)
  }

  _handleSigned() {
    this.props.onSigned()
    this.context.modal.close()
  }

  _handleUpdate(value) {
    this.setState({ value })
  }

  _handleValidate() {
    const { agreement, required, signed } = this.props
    if(required && !signed) {
      this.props.onValidate(null, 'You must sign the agreement')
    } else {
      this.props.onValidate(agreement.id)
    }
  }

}

export default SignatureField
