import PropTypes from 'prop-types'
import React from 'react'

class Dropdown extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    name: PropTypes.string,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    onReady: PropTypes.func
  }

  render() {
    const { code, options, placeholder } = this.props
    return (
      <div id={ code } className="ui selection dropdown">
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

  componentDidMount() {
    const { onReady } = this.props
    onReady()
  }

}

export default Dropdown
