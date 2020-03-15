import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class ValuesField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.array,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    option: '',
    options: []
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleKeyPress = this._handleKeyPress.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { options } = this.state
    return (
      <div className="crm-valuesfield-options">
        { options.map((option, index) => (
          <div className="crm-valuesfield-option" key={`option_${index}`}>
            <div className="crm-valuesfield-option-input">
              <input { ...this._getOption(option, index) } />
            </div>
            <div className="crm-valuesfield-option-icon" onClick={ this._handleRemove.bind(this, index) }>
              <i className="fa fa-remove" />
            </div>
          </div>
        ))}
        <div className="crm-valuesfield-option">
          <div className="crm-valuesfield-option-input">
            <input { ...this._getInput() } />
          </div>
          <div className="crm-valuesfield-option-icon" onClick={ this._handleAdd }>
            <i className="fa fa-plus" />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      options: defaultValue
    })
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { defaultValue } = this.props
    const { options } = this.state
    if(!_.isEqual(defaultValue, prevProps.defaultValue) && !_.isEqual(defaultValue, options)) {
      this.setState({
        options: defaultValue
      })
    }
    if(!_.isEqual(options, prevState.options)) {
      this._handleChange()
    }
  }

  _getInput() {
    const { option } = this.state
    return {
      type: 'text',
      placeholder: 'Enter a value',
      value: option,
      onChange: this._handleType,
      onKeyPress: this._handleKeyPress
    }
  }

  _getOption(opton, index) {
    const { options } = this.state
    return {
      type: 'text',
      placeholder: 'Enter a value',
      value: options[index].value,
      onChange: this._handleUpdate.bind(this, index)
    }
  }

  _handleAdd() {
    const { options, option } = this.state
    const code = _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    this.setState({
      option: '',
      options: [
        ...options,
        { code, value: option, text: option }
      ]
    })
  }

  _handleChange() {
    const { options } = this.state
    this.props.onChange(options)
  }

  _handleKeyPress(e) {
    const { option } = this.state
    if(e.which !== 13 || option.length === 0) return
    this._handleAdd()
  }

  _handleRemove(index) {
    const { options } = this.state
    this.setState({
      options: [
        ...options.filter((option, i) => {
          return i !== index
        })
      ]
    })
  }

  _handleType(e) {
    this.setState({
      option: e.target.value
    })
  }

  _handleUpdate(index, e) {
    const { options } = this.state
    this.setState({
      options: [
        ...options.map((option, i) => ({
          value: (i == index) ? e.target.value : option.value,
          text: (i == index) ? e.target.value : option.text
        }))
      ]
    })
  }

}

export default ValuesField
