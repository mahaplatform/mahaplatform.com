import { card } from 'creditcards'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class CardNumberField extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    value: ''
  }

  _handleChange = _.debounce(this._handleChange.bind(this), 250, { trailing: true })
  _handleClear = this._handleClear.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { value } = this.state
    const icon = this._getIcon()
    return (
      <div className="maha-input">
        <div className="maha-input-field">
          <div className="finance-card-number-field">
            <div className="finance-card-number-field-input">
              <input { ...this._getInput() }  />
            </div>
            { icon &&
              <div className="finance-card-number-field-icon">
                <img src={`/admin/images/payments/${icon}.png`} />
              </div>
            }
          </div>
        </div>
        { value && value.length > 0 &&
          <div className="maha-input-clear" onClick={ this._handleClear }>
            <i className="fa fa-times" />
          </div>
        }
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getIcon() {
    const { value } = this.state
    const type = card.type(value, true)
    if(type === 'Visa') return 'visa'
    if(type === 'Master Card') return 'mastercard'
    if(type === 'American Express') return 'amex'
    if(type === 'Discover') return 'discover'
    return null
  }

  _getInput() {
    return {
      type: 'text',
      placeholder: '1111 1111 1111 1111',
      onChange: this._handleUpdate,
      value: this._getFormatted()
    }
  }

  _getFormatted() {
    const { value } = this.state
    return card.format(value)
  }

  _handleChange() {
    const { value } = this.state
    this.props.onChange(value)
  }

  _handleClear() {
    this.setState({
      value: ''
    })
  }

  _handleUpdate(e) {
    this.setState({
      value: card.parse(e.target.value)
    })
  }

}

export default CardNumberField
