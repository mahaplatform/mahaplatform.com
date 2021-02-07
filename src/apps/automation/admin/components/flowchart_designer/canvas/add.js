import Connector from './connector'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Add extends React.Component {

  static propTypes = {
    answer: PropTypes.string,
    blocks: PropTypes.array,
    delta: PropTypes.number,
    editable: PropTypes.bool,
    parent: PropTypes.string,
    onAdd: PropTypes.func,
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
        <Connector type="vertical"/>
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
    const { editable } = this.props
    return {
      className: this._getClassName(),
      onDragEnter: editable ? this._handleDragEnter.bind(this) : null,
      onDragLeave: editable ? this._handleDragLeave.bind(this) : null,
      onDragOver: editable ? this._handleDragOver.bind(this) : null,
      onDrop: editable ? this._handleDrop : null
    }
  }

  _handleDrop(e) {
    e.preventDefault()
    e.stopPropagation()
    const { answer, blocks, delta, parent, onAdd, onNew } = this.props
    const type = e.dataTransfer.getData('type')
    const action = e.dataTransfer.getData('action')
    const block = _.find(blocks, { type, action })
    if(block.form) onNew({ type, action, parent, answer, delta })
    if(!block.form) onAdd(type, action, parent, answer, delta, {})
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
    }, 300)
  }

  _handleDragOver(e) {
    e.preventDefault()
  }

}

export default Add
