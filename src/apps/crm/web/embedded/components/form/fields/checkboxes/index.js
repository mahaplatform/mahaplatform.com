import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Checkboxes extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.array,
    htmlFor: PropTypes.string,
    name: PropTypes.object,
    options: PropTypes.array,
    required: PropTypes.bool,
    tabIndex: PropTypes.number,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  options = {}

  state = {
    selected: []
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    const { options } = this.props
    return (
      <div className="maha-checkboxes">
        { options.map((option, index) => (
          <div className="maha-checkbox" key={`option_${index}`}>
            <div className="maha-checkbox-icon" onClick={ this._handleChoose.bind(this, index) }>
              <i { ...this._getOption(option, index) } />
            </div>
            <div className="maha-checkbox-label">
              { option.text }
            </div>
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, onReady } = this.props
    if(defaultValue) this.setState({
      selected: defaultValue
    })
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    const { status } = this.props
    if(!_.isEqual(selected, prevState.selected)) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getIcon(option) {
    const { selected } = this.state
    return _.includes(selected, option.value) ? 'check-square' : 'square-o'
  }

  _getOption(option, index) {
    const { tabIndex } = this.props
    return {
      className: `fa fa-${this._getIcon(option)}`,
      ref: node => this.options[index] = node,
      tabIndex,
      onKeyDown: this._handleKeyDown.bind(this, index)
    }
  }

  _handleChange() {
    this.props.onChange(this.state.selected)
  }

  _handleChoose(index) {
    const { selected } = this.state
    const { options } = this.props
    const option = options[index]
    this.setState({
      selected: [
        ..._.xor(selected, [option.value])
      ]
    })
  }

  _handleKeyDown(index, e) {
    const { options } = this.props
    if(e.which === 38) this.options[index === 0 ? options.length - 1 : index - 1].focus()
    if(e.which === 40) this.options[index === options.length - 1 ? 0 : index + 1].focus()
    if(e.which === 32) this._handleChoose(index)
  }

  _handleValidate() {
    const { required } = this.props
    const { selected } = this.state
    if(required && selected.length === 0) {
      this.props.onValidate(selected, 'You must choose at least one value')
    } else {
      this.props.onValidate(selected)
    }
  }

}

export default Checkboxes
