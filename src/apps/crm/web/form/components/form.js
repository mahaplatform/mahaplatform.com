import PropTypes from 'prop-types'
import React from 'react'
import Field from './field'

class Form extends React.Component {

  static propTypes = {
    active: PropTypes.object,
    config: PropTypes.object,
    children: PropTypes.any,
    onAction: PropTypes.func
  }

  state = {
    hovering: false,
    index: 0
  }

  _handleDrop = this._handleDrop.bind(this)
  _handleDragEnter = this._handleDragEnter.bind(this)
  _handleDragLeave = this._handleDragLeave.bind(this)
  _handleDragOver = this._handleDragOver.bind(this)

  render() {
    const { hovering, index } = this.state
    const { fields } = this.props.config
    return (
      <div { ...this._getDropZone() }>
        <div className="maha-form">
          <div className="maha-form-fields">
            <div className="ui form">
              { (fields.length === 0 || (hovering && index === 0)) &&
                <div className="dropzone-target">Drop Field Here</div>
              }
              { fields.map((field, fieldIndex) => (
                <div key={`field_${fieldIndex}`} className="dropzone-block" data-index={ fieldIndex }>
                  <Field { ...this._getField(field, fieldIndex) } />
                  { hovering && fieldIndex + 1 === index &&
                    <div className="dropzone-target">Drop Field Here</div>
                  }
                </div>
              )) }
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getField(field, index) {
    const { active, onAction } = this.props
    return {
      active,
      field,
      index,
      onAction
    }
  }

  _getDropZone() {
    return {
      className: 'dropzone',
      onDragEnter: this._handleDrag.bind(this, 'enter'),
      onDragOver: this._handleDrag.bind(this, 'over'),
      onDrop: this._handleDrop
    }
  }

  _getMiddle(el) {
    const rect = el.getBoundingClientRect()
    return rect.y + (rect.height / 2)
  }

  _getParent(el, selector) {
    const matches = (el.matches || el.matchesSelector)
    while ((el = el.parentElement) && !(matches.call(el, selector))) { null }
    return el
  }

  _handleDrag(action, e) {
    e.preventDefault()
    e.stopPropagation()
    if(action === 'enter') this._handleDragEnter()
    if(action === 'over') this._handleDragOver(e.target, e.currentTarget, e.clientX, e.clientY)
  }

  _handleDrop(e) {
    const { index } = this.state
    const { onAction } = this.props
    e.preventDefault()
    e.stopPropagation()
    onAction('add', {
      type: e.dataTransfer.getData('type'),
      index
    })
    this.setState({
      hovering: false,
      index: 0
    })
  }

  _handleDragEnter() {
    this._handleHover(true)
  }

  _handleDragLeave() {
    this._handleHover(false)
  }

  _handleDragOver(target, dropzone, x, y) {
    const { fields } = this.props.config
    const field = this._getParent(target, '.dropzone-block')
    if(this.timeout) clearTimeout(this.timeout)
    this.timeout = setTimeout(this._handleDragLeave, 100)
    if(field) {
      const blockIndex = parseInt(field.dataset.index)
      const middle = this._getMiddle(field)
      if(y <= middle) return this._handleIndex(blockIndex)
      if(y > middle) return this._handleIndex(blockIndex + 1)
    }
    const middle = this._getMiddle(dropzone)
    if(y <= middle) return this._handleIndex(0)
    if(y > middle) return this._handleIndex(fields.length)
  }

  _handleHover(hovering) {
    this.setState({ hovering })
  }

  _handleIndex(index) {
    this.setState({ index })
  }

}

export default Form
