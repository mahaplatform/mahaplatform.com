import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Checkboxes extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.array,
    name: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onFinalize: PropTypes.func,
    onValidate: PropTypes.func
  }

  state = {
    selected: []
  }

  _handleChange = this._handleChange.bind(this)

  render() {
    const { options } = this.props
    return (
      <div className="maha-checkboxes">
        { options.map((option, index) => (
          <div className="maha-checkbox" key={`option_${index}`} onClick={ this._handleChoose.bind(this, option) }>
            <div className="maha-checkbox-icon">
              <i className={`fa fa-fw fa-${this._getIcon(option)}`} />
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
      if(status === 'finalizing') this._handleFinalize()
    }
  }

  _getIcon(option) {
    const { selected } = this.state
    return _.includes(selected, option.value) ? 'check-square' : 'square-o'
  }

  _handleChange() {
    this.props.onChange(this.state.selected)
  }

  _handleChoose(option) {
    const { selected } = this.state
    this.setState({
      selected: [
        ..._.xor(selected, [option.value])
      ]
    })
  }

  _handleFinalize() {
    this.props.onFinalize(this.state.selected)
  }

  _handleValidate() {
    const { required } = this.props
    const { selected } = this.state
    if(required && selected.length === 0) {
      this.props.onValidate('invalid', 'You must choose at least one value')
    } else {
      this.props.onValidate('valid')
    }
  }

}

export default Checkboxes
