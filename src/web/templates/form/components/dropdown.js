import PropTypes from 'prop-types'
import React from 'react'

class Dropdown extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string
  }

  render() {
    const { options, placeholder } = this.props
    return (
      <div className="ui selection dropdown">
        <input type="hidden" name="gender" />
        <i className="dropdown icon"></i>
        <div className="default text">{ placeholder }</div>
        <div className="menu">
          { options.map((option, index) => (
            <div className="item" key={`option_${index}`} data-value={ option.value }>{ option.text }</div>
          ))}
        </div>
      </div>
    )
  }

}

export default Dropdown
