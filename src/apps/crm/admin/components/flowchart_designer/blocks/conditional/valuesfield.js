import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Values extends React.Component {

  static propTypes = {
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
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { options } = this.state
    return (
      <div className="conditional-options">
        { options.map((option, index) => (
          <div className="conditional-option" key={`option_${index}`}>
            <div className="conditional-option-label">
              { option.text }
            </div>
            <div className="conditional-option-icon" onClick={ this._handleRemove.bind(this, index) }>
              <i className="fa fa-remove" />
            </div>
          </div>
        ))}
        <div className="conditional-option">
          <div className="conditional-option-input">
            <input { ...this._getInput() } />
          </div>
          <div className="conditional-option-icon" onClick={ this._handleAdd }>
            <i className="fa fa-plus" />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { options } = this.state
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
      onChange: this._handleUpdate,
      onKeyPress: this._handleKeyPress
    }
  }

  _handleAdd() {
    const { options, option } = this.state
    this.setState({
      option: '',
      options: [
        ...options,
        { value: option, text: option }
      ]
    })
  }

  _handleChange() {
    const { options } = this.state
    this.props.onChange([
      ...options,
      { value: 'else', text: 'Else'}
    ])
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

  _handleUpdate(e) {
    this.setState({
      option: e.target.value
    })
  }

}

export default Values
