import creditcard from 'credit-card'
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
            <div className="finance-card-number-field-icon">
              { icon ?
                <img src={`/admin/images/payments/${icon}.png`} /> :
                <i className="fa fa-credit-card-alt" />
              }
            </div>
            <div className="finance-card-number-field-input">
              <input { ...this._getInput() }  />
            </div>
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

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.state
    if(value !== prevState.value) {
      this._handleChange()
    }
  }

  _getIcon() {
    const { value } = this.state
    const type = creditcard.determineCardType(value, { allowPartial: true })
    if(type === 'VISA') return 'visa'
    if(type === 'MASTERCARD') return 'mastercard'
    if(type === 'AMERICANEXPRESS') return 'amex'
    if(type === 'DISCOVER') return 'discover'
    if(type === 'JCB') return 'jcb'
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
