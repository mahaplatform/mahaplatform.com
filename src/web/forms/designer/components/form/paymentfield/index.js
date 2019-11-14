import PropTypes from 'prop-types'
import methods from './methods'
import React from 'react'

class PaymentField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onFinalize: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  state = {
    selected: null
  }

  render() {
    const { selected } = this.state
    return (
      <div className="maha-paymentfield">
        { selected === null &&
          <div className="maha-paymentfield-methods">
            { methods.map((method, index) => (
              <div className={`maha-paymentfield-method ${method.name}`} key={`method_${index}`} onClick={ this._handleChoose.bind(this, index) }>
                <div className="maha-paymentfield-method-icon">
                  <i className={`fa fa-${ method.icon }`} />
                </div>
                <div className="maha-paymentfield-method-label">
                  Pay with { method.label }
                </div>
              </div>
            ))}
          </div>
        }
        { selected !== null &&
          <div className="maha-paymentfield-payment">
            <div className={`maha-paymentfield-chosen ${methods[selected].name}`}>
              <div className="maha-paymentfield-chosen-icon">
                <i className={`fa fa-${ methods[selected].icon }`} />
              </div>
              <div className="maha-paymentfield-chosen-label">
                { methods[selected].label }
              </div>
              <div className="maha-paymentfield-chosen-change" onClick={ this._handleChoose.bind(this, null) }>
                change
              </div>
            </div>
            { methods[selected].component && this._getComponent() }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { onReady } = this.props
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
      if(status === 'finalizing') this._handleFinalize()
    }
  }

  _getComponent() {
    const { selected } = this.state
    const Component = methods[selected].component
    return Component ? <Component /> : null
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

  _handleFinalize() {
    this.props.onFinalize('paymentToken')
  }

  _handleValidate() {
    console.log('validating payment field')
    this.props.onValidate('valid')
  }

}

export default PaymentField
