import PropTypes from 'prop-types'
import methods from './methods'
import React from 'react'

class payment extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    token: PropTypes.string,
    onChange: PropTypes.func,
    onFetch: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  state = {
    selected: null
  }

  render() {
    const { selected } = this.state
    return (
      <div className="maha-payment">
        { selected === null &&
          <div className="maha-payment-methods">
            { methods.map((method, index) => (
              <div className={`maha-payment-method ${method.name}`} key={`method_${index}`} onClick={ this._handleChoose.bind(this, index) }>
                <div className="maha-payment-method-icon">
                  <i className={`fa fa-${ method.icon }`} />
                </div>
                <div className="maha-payment-method-label">
                  Pay with { method.label }
                </div>
              </div>
            ))}
          </div>
        }
        { selected !== null &&
          <div className="maha-payment-payment">
            <div className={`maha-payment-chosen ${methods[selected].name}`}>
              <div className="maha-payment-chosen-icon">
                <i className={`fa fa-${ methods[selected].icon }`} />
              </div>
              <div className="maha-payment-chosen-label">
                { methods[selected].label }
              </div>
              <div className="maha-payment-chosen-change" onClick={ this._handleChoose.bind(this, null) }>
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
    this.props.onFetch()
  }

  componentDidUpdate(prevProps) {
    const { status, token, onReady } = this.props
    if(token !== prevProps.token && token) {
      // onReady()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
      if(status === 'finalizing') this._handleFinalize()
    }
  }

  _getComponent() {
    const { token } = this.props
    const { selected } = this.state
    const props = {
      token
    }
    const Component = methods[selected].component
    return Component ? <Component { ...props } /> : null
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

  // _handleFinalize() {
  //   this.props.onFinalize('paymentToken')
  // }
  //
  // _handleValidate() {
  //   console.log('validating payment field')
  //   this.props.onValidate('valid')
  // }

}

export default payment
