import PropTypes from 'prop-types'
import Format from '../format'
import React from 'react'

class Options extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    format: PropTypes.any,
    options: PropTypes.array,
    onChoose: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { format, options } = this.props
    return (
      <div className="picklist-options">
        { options.map((option, index) => (
          <div className="picklist-option" key={`option_${index}`} onClick={ this._handleClick.bind(this, option.value)}>
            <Format { ...option } format={ format } value={ option.text } />
          </div>
        )) }
      </div>
    )
  }

  _handleClick(value) {
    this.props.onChoose(value)
  }

}

export default Options
