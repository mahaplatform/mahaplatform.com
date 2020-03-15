import PropTypes from 'prop-types'
import React from 'react'

class Add extends React.Component {

  static propTypes = {
    answer: PropTypes.string,
    delta: PropTypes.number,
    parent: PropTypes.string,
    onNew: PropTypes.func
  }

  timeout = null

  state = {
    hovering: false
  }

  _handleDrop = this._handleDrop.bind(this)
  _handleDragEnter = this._handleDragEnter.bind(this)
  _handleDragLeave = this._handleDragLeave.bind(this)
  _handleDragOver = this._handleDragOver.bind(this)

  render() {
    return (
      <div { ...this._getTarget() }>
        <div className="flowchart-box-add" />
      </div>
    )
  }

  _getClassName() {
    const { hovering } = this.state
    const classes = ['flowchart-box-add-target']
    if(hovering) classes.push('hovering')
    return classes.join(' ')
  }

  _getTarget() {
    return {
      className: this._getClassName(),
      onDragEnter: this._handleDragEnter.bind(this),
      onDragLeave: this._handleDragLeave.bind(this),
      onDragOver: this._handleDragOver.bind(this),
      onDrop: this._handleDrop
    }
  }

  _handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    const { parent, answer, delta } = this.props
    const type = e.dataTransfer.getData('type')
    const action = e.dataTransfer.getData('action')
    this.props.onNew({ type, action, parent, answer, delta })
    this.setState({
      hovering: false
    })
  }

  _handleDragEnter(e) {
    if(this.timout) clearTimeout(this.timeout)
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      hovering: true
    })
  }

  _handleDragLeave() {
    this.timout = setTimeout(() => {
      this.setState({
        hovering: false
      })
    }, 500)
  }

  _handleDragOver(e) {
    e.preventDefault()
  }

}

export default Add
