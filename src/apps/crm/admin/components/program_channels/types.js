import PropTypes from 'prop-types'
import React from 'react'

const types = [
  { name: 'email', icon: 'envelope' },
  { name: 'sms', icon: 'comments' },
  { name: 'voice', icon: 'phone' }
]

class Types extends React.PureComponent {

  static propTypes = {
    type: PropTypes.string,
    onChoose: PropTypes.func
  }

  state = {
    selected: null
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <div className="crm-program-channels-types">
        { types.map((type, index) => (
          <div className={ this._getClass(type) } key={`type_${index}`} onClick={ this._handleChoose.bind(this, type.name) }>
            <i className={`fa fa-${type.icon}`} />
          </div>
        ))}
      </div>
    )
  }

  componentDidMount() {
    const { type } = this.props
    this.setState({
      selected: type
    })
  }

  _getClass(type) {
    const { selected } = this.state
    const classes = ['crm-program-channels-type']
    if(type.name === selected) classes.push('selected')
    return classes.join(' ')
  }

  _handleChoose(selected) {
    this.setState({ selected })
    this.props.onChoose(selected)
  }

}

export default Types
