import Form from '../index'
import PropTypes from 'prop-types'
import React from 'react'

class Manual extends React.Component {

  static contextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    q: PropTypes.string,
    tabIndex: PropTypes.number,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onValidate: PropTypes.func
  }

  form = null

  _handleValid = this._handleValid.bind(this)
  _handleValidate = this._handleValidate.bind(this)

  render() {
    return (
      <div className="maha-addressfield-manual">
        <Form { ...this._getForm() } />
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getForm() {
    const { q, tabIndex } = this.props
    return {
      button: false,
      captcha: false,
      reference: node => this.form = node,
      onSuccess: this._handleValid,
      tabIndex,
      fields: [
        { type: 'segment', fields: [
          { name: 'street_1', type: 'textfield', placeholder: 'Enter street 1', required: true, defaultValue: q.trim() },
          { name: 'street_2', type: 'textfield', placeholder: 'Enter street 2' },
          { type: 'fields', fields: [
            { name: 'city', type: 'textfield', placeholder: 'Enter city', required: true },
            { name: 'state_province', type: 'textfield', placeholder: 'Enter state/province', required: true },
            { name: 'postal_code', type: 'textfield', placeholder: 'Enter postal code', required: true }
          ] }
        ] }
      ]
    }
  }

  _getDescription(address) {
    const { street_1, street_2, city, state_province, postal_code } = address
    const parts = [street_1]
    if(street_2) parts.push(street_2)
    parts.push(city)
    parts.push(state_province)
    parts.push(postal_code)
    return parts.join(', ')
  }

  _handleValid(address) {
    this.props.onValidate({
      description: this._getDescription(address),
      manual: true,
      ...address
    })
  }

  _handleValidate() {
    this.form.submit()
  }

}

export default Manual
