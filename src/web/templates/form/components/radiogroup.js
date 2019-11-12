import PropTypes from 'prop-types'
import React from 'react'

class RadioGroup extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.array,
    name: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string
  }

  state = {
    selected: null
  }

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
    const { defaultValue } = this.props
    if(defaultValue) this.setState({
      selected: defaultValue
    })
  }

  _getIcon(option) {
    const { selected } = this.state
    return option.value === selected ? 'check-circle' : 'circle-o'
  }

  _getInput() {
    const { code, name, placeholder } = this.props
    return {
      id: code,
      type: 'text',
      name,
      placeholder
    }
  }

  _handleChoose(option) {
    this.setState({
      selected: option.value
    })
  }

}

export default RadioGroup
