import PropTypes from 'prop-types'
import React from 'react'

class Methods extends React.Component {

  static propTypes = {
    methods: PropTypes.array,
    onChoose: PropTypes.func
  }

  state = {
    selected: 'card'
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { methods } = this.props
    return (
      <div className="maha-payment-methods">
        <div className="maha-payment-label">Method</div>
        <div className="maha-payment-options">
          { methods.map((method, index) => (
            <div className="maha-payment-option" key={`method_${index}`} onClick={ this._handleChoose.bind(this, method.value) }>
              <div className="maha-payment-option-icon">
                <i className={`fa fa-${ this._getIcon(method.value) }`} />
              </div>
              <div className="maha-payment-option-mark">
                <img src={`/images/payments/${method.value}-mark.png`} />
              </div>
              <div className="maha-payment-option-label">
                { method.label }
              </div>
            </div>
          )) }
        </div>
      </div>
    )
  }

  _getIcon(value) {
    const { selected } = this.state
    return value === selected ? 'check-circle' : 'circle-o'
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    if(selected !== prevState.selected) {
      this.props.onChoose(selected)
    }
  }

  _getClass(method) {
    const { selected } = this.state
    const classes = ['maha-payment-methods-option']
    if(method.value === selected) classes.push('selected')
    return classes.join(' ')
  }

  _handleChoose(selected) {
    this.setState({ selected })
  }

}

export default Methods
