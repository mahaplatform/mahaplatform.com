import { Button, TextField } from 'maha-client'
import PropTypes from 'prop-types'
import React from 'react'

class Discount extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    Store: PropTypes.object,
    onApply: PropTypes.func
  }

  state = {
    errror: null,
    value: ''
  }

  _handleApply = this._handleApply.bind(this)
  _handleChange = this._handleChange.bind(this)

  render() {
    const { error } = this.state
    return (
      <div className="maha-cart-discount">
        <div className="maha-cart-discount-input">
          <div className="maha-cart-discount-field">
            <div className="ui form">
              <TextField { ...this._getTextField() } />
            </div>
          </div>
          <div className="maha-cart-discount-button">
            <Button { ...this._getButton() } />
          </div>
        </div>
        { error  &&
          <div className="maha-cart-discount-error">
            { error }
          </div>
        }
      </div>
    )
  }

  _getTextField() {
    return {
      defaultValue: null,
      placeholder: 'Discount Code',
      onChange: this._handleChange
    }
  }

  _getButton() {
    const { value } = this.state
    return {
      label: 'Apply',
      color: 'red',
      disabled: value.length === 0,
      handler: this._handleApply
    }
  }

  _handleApply() {
    const { code, Store } = this.props
    const { value } = this.state
    if(!value) return
    this.setState({
      error: null
    })
    this.context.network.request({
      method: 'patch',
      endpoint: `/api/stores/stores/${Store.code}/carts/${code}/discount`,
      body: {
        code: value
      },
      onFailure: ({ data }) => {
        this.setState({
          error: data.message
        })
      },
      onSuccess: ({ data }) => {
        this.props.onApply(data)
      }
    })
  }

  _handleChange(value) {
    this.setState({ value })
  }

}

export default Discount
