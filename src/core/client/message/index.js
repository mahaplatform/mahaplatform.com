import React from 'react'
import PropTypes from 'prop-types'

class Message extends React.Component {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    animation: PropTypes.string,
    backgroundColor: PropTypes.string,
    icon: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    color: PropTypes.string,
    component: PropTypes.any
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
    const { component, icon, image, text, title } = this.props
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

}

export default Message
