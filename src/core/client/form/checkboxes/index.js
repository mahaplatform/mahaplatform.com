import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Checkboxes extends React.Component {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.array,
    endpoint: PropTypes.string,
    htmlFor: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    required: PropTypes.bool,
    tabIndex: PropTypes.number,
    value: PropTypes.string,
    status: PropTypes.string,
    text: PropTypes.string,
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
    options: null,
    selected: []
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    const { options } = this.state
    if(!options) return null
    return (
      <div className="maha-checkboxes">
        { options.map((option, index) => (
          <div className="maha-checkbox" key={`option_${index}`} onClick={ this._handleChoose.bind(this, index) }>
            <div className="maha-checkbox-icon">
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
    const { endpoint, options } = this.props
    if(endpoint) return this._handleFetch()
    this._handleOptions(options)
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    const { options, status } = this.props
    if(!_.isEqual(options, prevState.options)) {
      this.setState({ options })
    }
    if(!_.isEqual(selected, prevState.selected)) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getIcon(index) {
    const { selected } = this.state
    return _.includes(selected, index) ? 'check-square' : 'square-o'
  }

  _getOption(option, index) {
    const { tabIndex } = this.props
    return {
      className: `fa fa-${this._getIcon(index)}`,
      ref: node => this.options[index] = node,
      tabIndex,
      onKeyDown: this._handleKeyDown.bind(this, index)
    }
  }

  _getValue() {
    const { options, selected } = this.state
    return options.filter((option, index) => {
      return _.includes(selected, index)
    }).map(option => {
      return option.value
    })
  }

  _handleChange() {
    const value = this._getValue()
    this.props.onChange(value)
  }

  _handleChoose(index) {
    const { selected } = this.state
    this.setState({
      selected: [
        ..._.xor(selected, [index])
      ]
    })
  }

  _handleFetch() {
    const { endpoint, text, value } = this.props
    this.context.network.request({
      endpoint,
      method: 'GET',
      onSuccess: ({ data }) => {
        this._handleOptions(data.map(option => ({
          value: _.get(option, value),
          text: _.get(option, text)
        })))
      }
    })
  }

  _handleKeyDown(index, e) {
    const { options } = this.state
    if(e.which === 9) return
    if(e.which === 38) {
      this.options[index === 0 ? options.length - 1 : index - 1].focus()
    } else if(e.which === 40) {
      this.options[index === options.length - 1 ? 0 : index + 1].focus()
    } else if(_.includes([32,13], e.which)) {
      this._handleChoose(index)
    }
    e.preventDefault()
  }

  _handleOptions(options) {
    const { defaultValue } = this.props
    this.setState({ options })
    if(defaultValue) {
      this.setState({
        selected: options.reduce((selected, option, index) => [
          ...selected,
          ..._.includes(defaultValue, option.value) ? [index] : []
        ], [])
      })
    }
    this.props.onReady()
  }

  _handleValidate() {
    const { required } = this.props
    const { selected } = this.state
    if(required && selected.length === 0) {
      this.props.onValidate(null, 'You must choose at least one value')
    } else {
      const value = this._getValue()
      this.props.onValidate(value)
    }
  }

}

export default Checkboxes
