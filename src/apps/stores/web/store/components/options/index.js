import PropTypes from 'prop-types'
import React from 'react'

class Options extends React.Component {

  static propTypes = {
    options: PropTypes.array
  }

  state = {
    selected: null
  }

  render() {
    const { options } = this.props
    return (
      <div className="store-options">
        { options.map((option, index) => (
          <div className={ this._getClass(option) } key={`option_${index}`} onClick={ this._handleClick.bind(this, option) }>
            { option }
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {
    const { options } = this.props
    this.setState({
      selected: options[0]
    })
  }

  _getClass(option) {
    const { selected } = this.state
    const classes = ['store-options-option']
    if(option === selected) classes.push('selected')
    return classes.join(' ')
  }

  _handleClick(selected) {
    this.setState({ selected })
  }

}

export default Options
