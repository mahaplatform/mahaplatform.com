import React from 'react'
import PropTypes from 'prop-types'

class Chooser extends React.Component {

  static propTypes = {
    options: PropTypes.array,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    onReady: PropTypes.func
  }

  static defaultProps = {
    onChange: () => {},
    onReady: () => {}
  }

  state = {
    active: 0
  }

  render() {
    const { options } = this.props
    if(!options) return null
    return (
      <div className="maha-import-preview-chooser">
        { options.map((option, index) => (
          <div className={ this._getClass(index) } key={`option_${index}`} onClick={ this._handleChoose.bind(this, index) }>
            { option.value }
          </div>
        )) }
      </div>
    )

  }

  componentDidUpdate(prevProps, prevState) {
    const { options, onChange } = this.props
    const { active } = this.state
    if(active !== prevState.active) {
      onChange(options[active].key)
    }
  }

  _getClass(index) {
    const { active } = this.state
    const classes = ['maha-import-preview-chooser-item']
    if(index === active) classes.push('active')
    return classes.join(' ')
  }

  _handleChoose(index) {
    this.setState({
      active: index
    })
  }

}

export default Chooser
