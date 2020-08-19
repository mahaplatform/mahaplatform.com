import React from 'react'
import PropTypes from 'prop-types'
import Buttons from '../buttons'
import _ from 'lodash'

class Message extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    animation: PropTypes.string,
    backgroundColor: PropTypes.string,
    buttons: PropTypes.array,
    button: PropTypes.object,
    component: PropTypes.any,
    color: PropTypes.string,
    icon: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string
  }

  static defaultProps = {
    backgroundColor: null,
    animation: null,
    color: null
  }

  state = {
    animate: false
  }

  render() {
    const { buttons, button, component, icon, image, text, title } = this.props
    return (
      <div className={ this._getClass() }>
        <div className="maha-message-panel">
          { icon &&
            <div className="maha-message-panel-icon">
              <h2>
                <i className={ this._getIconClass() } />
              </h2>
            </div>
          }
          { image &&
            <div className="maha-message-panel-icon">
              <img src={ image } />
            </div>
          }
          { title && <h3>{ title }</h3> }
          { text && <p>{ text }</p> }
          { component }
          { (buttons || button) && <Buttons { ...this._getButtons() } /> }
        </div>
      </div>
    )
  }

  componentDidMount() {
    if(!this.props.animation) return
    setTimeout(() => {
      this.setState({ animate: true })
      setTimeout(() => {
        this.setState({ animate: false })
      }, 500)
    }, 500)
  }

  _getClass() {
    const { backgroundColor } = this.props
    const classes = ['maha-message']
    if(backgroundColor) classes.push(backgroundColor)
    return classes.join(' ')
  }

  _getIconClass() {
    const { animate } = this.state
    const { animation, color, icon } = this.props
    const classes = ['fa', `fa-${icon}`]
    if(animate && animation) classes.push(`animated ${animation}`)
    if(color) classes.push(color)
    return classes.join(' ')
  }

  _getButtons() {
    const { buttons, button } = this.props
    return {
      buttons: [
        ...button ? _.castArray(button) : [],
        ...buttons || []
      ].map(button => ({
        basic: true,
        color: 'red',
        label: button.label,
        modal: button.modal,
        handler: button.handler,
        request: button.request
      }))
    }
  }

}

export default Message
