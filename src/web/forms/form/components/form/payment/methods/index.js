import PropTypes from 'prop-types'
import React from 'react'

class Methods extends React.Component {

  static propTypes = {
    methods: PropTypes.array,
    selected: PropTypes.number,
    onChoose: PropTypes.func
  }

  render() {
    const { methods } = this.props
    return (
      <div className="maha-payment-methods">
        { methods.map((method, index) => (
          <div className={ this._getClass(index) } key={`method_${index}`} onClick={ this._handleChoose.bind(this, index) }>
            <div className="maha-payment-method-icon">
              <i className={`fa fa-${ method.icon }`} />
            </div>
            <div className="maha-payment-method-label">
              { method.label }
            </div>
          </div>
        ))}
      </div>
    )
  }

  _getClass(index) {
    const { selected } = this.props
    const classes = ['maha-payment-method']
    if(index === selected) classes.push('selected')
    return classes.join(' ')
  }

  _handleChoose(selected) {
    this.props.onChoose(selected)
  }

}

export default Methods
