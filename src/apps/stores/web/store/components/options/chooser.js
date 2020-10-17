import PropTypes from 'prop-types'
import React from 'react'

class Options extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    values: PropTypes.array,
    onChange: PropTypes.func
  }

  state = {
    selected: null
  }

  render() {
    const { values } = this.props
    return (
      <div className="store-option-values">
        { values.map((value, index) => (
          <div className={ this._getClass(value) } key={`option_${index}`} onClick={ this._handleClick.bind(this, value) }>
            { value }
          </div>
        )) }
      </div>
    )
  }

  componentDidMount() {
    const { values } = this.props
    this.setState({
      selected: values[0]
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state
    if(selected !== prevState.selected) {
      this.props.onChange(selected)
    }
  }

  _getClass(value) {
    const { selected } = this.state
    const classes = ['store-option-value']
    if(value === selected) classes.push('selected')
    return classes.join(' ')
  }

  _handleClick(selected) {
    this.setState({ selected })
  }

}

export default Options
