import PropTypes from 'prop-types'
import { Button } from '@client'
import Sign from './sign'
import React from 'react'

const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i

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

  _handleSigned = this._handleSigned.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <div className="maha-signaturefield">
        <Button { ...this._getButton() } />
      </div>
    )
  }

  componentDidMount() {
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
    const { email } = tokens
    return (!email || !EMAIL_REGEX.test(email))
  }

  _getSign() {
    const { asset_id, cid, profile_id, tokens, onCreateAgreement } = this.props
    const { email } = tokens
    return {
      asset_id,
      cid,
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
      this.props.onValidate(signed ? agreement.id : null)
    }
  }

}

export default SignatureField
