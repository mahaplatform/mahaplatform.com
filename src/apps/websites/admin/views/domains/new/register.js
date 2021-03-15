import Lookup from '@apps/websites/admin/components/lookup'
import PropTypes from 'prop-types'
import React from 'react'

class Register extends React.Component {

  static propTypes = {
    formdata: PropTypes.object,
    onBack: PropTypes.func,
    onCancel: PropTypes.func,
    onChange: PropTypes.func,
    onNext: PropTypes.func,
    onSave: PropTypes.func
  }

  form = null

  state = {
    domain: {}
  }

  _handleChange = this._handleChange.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return <Lookup { ...this._getLookup() } />
  }

  _getLookup() {
    return {
      onChoose: this._handleSuccess
    }
  }

  _handleChange(domain) {
    this.setState({ domain })
  }

  _handleSuccess(name) {
    console.log(name)
    this.props.onNext({ name })
  }

}

export default Register
