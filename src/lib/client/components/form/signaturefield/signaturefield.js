import PropTypes from 'prop-types'
import { Button } from '@client'
import moment from 'moment'
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
    email: PropTypes.string,
    isEmailValid: PropTypes.bool,
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
    onClear: PropTypes.func,
    onReady: PropTypes.func,
    onSigned: PropTypes.func,
    onSetEmail: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    prompt: 'Sign Document',
    onChange: () => {},
    onReady: () => {}
  }

  _handleCreateAgreement = this._handleCreateAgreement.bind(this)
  _handleTokens = _.debounce(this._handleTokens.bind(this), 500)
  _handleSigned = this._handleSigned.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { agreement_status, isEmailValid, signed } = this.props
    return (
      <div className="maha-signaturefield">
        { !signed ?
          <div className="maha-signaturefield-input">
            <Button { ...this._getButton() } />
            <div className="maha-signaturefield-status">
              { !isEmailValid &&
                <span>
                  <i className="fa fa-clock-o" /> awaiting valid email
                </span>
              }
              { (isEmailValid && agreement_status !== 'success') &&
                <span>
                  <i className="fa fa-circle-o-notch fa-spin" /> preparing document
                </span>
              }
              { agreement_status === 'success' &&
                <span>
                  <i className="fa fa-check" /> ready to sign
                </span>
              }
            </div>
          </div> :
          <div className="maha-signature-token">
            <div className="maha-signature-token-icon">
              <i className="fa fa-check-circle" />
            </div>
            <div className="maha-signature-token-label">
              Signed on { moment().format('MM/DD/YY [@] hh:mm A')}
            </div>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps) {
    const { email, isEmailValid, status, signed, tokens } = this.props
    if(email !== prevProps.email) {
      if(isEmailValid) return this._handleCreateAgreement()
      if(!email) return this.props.onClear()
    }
    if(signed !== prevProps.signed) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
    if(!_.isEqual(tokens, prevProps.tokens)) {
      this._handleTokens()
    }
  }

  _getButton() {
    const { agreement_status, prompt } = this.props
    return {
      label: prompt,
      disabled: agreement_status !== 'success',
      className: agreement_status === 'success' ? 'ui fluid black button' : 'ui fluid button',
      modal: <Sign { ...this._getSign() } />
    }
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

  _handleCreateAgreement() {
    const { asset_id, email, profile_id } = this.props
    this.props.onCreateAgreement(asset_id, profile_id, email)
  }

  _handleChange() {
    const { agreement, signed } = this.props
    this.props.onChange(signed ? agreement.id : null)
  }

  _handleTokens() {
    const email = this.props.tokens.email || null
    if(email === this.props.email) return
    this.props.onSetEmail(email)
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
