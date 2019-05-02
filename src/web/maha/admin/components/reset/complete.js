import PropTypes from 'prop-types'
import React from 'react'

class Complete extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    team: PropTypes.object,
    token: PropTypes.string,
    user: PropTypes.object
  }

  state = {
    tada: false
  }

  _handleClick = this._handleClick.bind(this)

  render() {
    return (
      <div className="maha-signin-panel">
        <div className={ this._getClass() }>
          <div className="maha-signin-content">
            <h1><i className="fa fa-check-circle" /></h1>
            <h2>Congratulations!</h2>
            <p>Your password was successfully reset!</p>
            <div className="field button-field">
              <button className="ui fluid large button" onClick={ this._handleClick }>
                Continue <i className="right chevron icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleTada()
  }

  _getClass() {
    const { tada } = this.state
    const classes = ['maha-signin-form']
    if(tada) classes.push('animated tada')
    return classes.join(' ')
  }

  _handleClick() {
    const { admin } = this.context
    const { team, token, user } = this.props
    admin.signin(team, token, user)
  }

  _handleTada() {
    setTimeout(() => {
      this.setState({ tada: true })
      setTimeout(() => {
        this.setState({ tada: false })
      }, 500)
    }, 500)
  }
  
}

export default Complete
