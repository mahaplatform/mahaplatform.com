import PropTypes from 'prop-types'
import React from 'react'

class Checkbox extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.bool,
    disabled: PropTypes.bool,
    prompt: PropTypes.string,
    tabIndex: PropTypes.number,
    onBusy: PropTypes.func,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    defaultValue: false,
    disabled: false,
    tabIndex: 0,
    onBusy: () => {},
    onChange: (value) => {},
    onReady: () => {}
  }

  state = {
    value: false
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    const { disabled, prompt, tabIndex } = this.props
    return (
      <div className={ `maha-checkbox ${(disabled) ? 'toggle-disabled' : ''}` } tabIndex={ tabIndex }>
        <i className={ `fa fa-fw fa-${this._getIcon()} ${(disabled) ? 'disabled' : ''}` } onClick={ this._handleChange } />
        { prompt }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    const value = defaultValue || false
    this.setValue(value)
    if(onReady) onReady()
  }

  _getIcon() {
    return `toggle-${this.state.value ? 'on' : 'off'}`
  }

  _handleChange(value) {
    const { disabled, onClick } = this.props
    if(!disabled){
      if(onClick) onClick()
      this.setValue(!this.state.value)
    }
  }

  setValue(value) {
    const { onChange } = this.props
    this.setState({ value })
    if(onChange) onChange(value)
  }

}

export default Checkbox
