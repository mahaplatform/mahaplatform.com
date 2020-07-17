import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.Component {

  static contextTypes = {
    confirm: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.object,
    canvas: PropTypes.string,
    config: PropTypes.object,
    editable: PropTypes.bool,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onClone: PropTypes.func,
    onEdit: PropTypes.func,
    onMove: PropTypes.func,
    onRemove: PropTypes.func
  }

  preview = null

  _handleAdd = this._handleAdd.bind(this)
  _handleClone = this._handleClone.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleHighlight = this._handleHighlight.bind(this)
  _handleMove = this._handleMove.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleRender = this._handleRender.bind(this)

  render() {
    return <iframe { ...this._getIframe() } />
  }

  componentDidMount() {
    this.pasteur = new Pasteur({
      window,
      target: this.preview.contentWindow,
      name: 'designerComponent',
      targetName: 'designerCanvas'
    })
    this.pasteur.on('add', this._handleAdd)
    this.pasteur.on('clone', this._handleClone)
    this.pasteur.on('edit', this._handleEdit)
    this.pasteur.on('move', this._handleMove)
    this.pasteur.on('remove', this._handleRemove)
    this.pasteur.on('ready', this._handleRender)
  }

  componentDidUpdate(prevProps) {
    const { active, config } = this.props
    if(!_.isEqual(active, prevProps.active)) {
      this._handleHighlight()
      this._handleRender()
    }
    if(!_.isEqual(config, prevProps.config)) {
      this._handleRender()
    }
  }

  componentWillUnmount() {
    this.pasteur.close()
  }

  _getIframe() {
    const { canvas } = this.props
    return {
      ref: node => this.preview = node,
      src: canvas
    }
  }

  _handleRender() {
    const { config, editable } = this.props
    this.pasteur.send('update', { config, editable })
  }

  _handleAdd({ section, type, index }) {
    this.props.onAdd(section, index, { type })
  }

  _handleClone({ section, block }) {
    this.props.onClone(section, block)
  }

  _handleEdit({ section, block }) {
    this.props.onEdit(section, block)
  }

  _handleHighlight() {
    const { active } = this.props
    this.pasteur.send('highlight', { active })
  }

  _handleMove({ from, to }) {
    this.props.onMove(from, to)
  }

  _handleRemove({ section, block }) {
    const { confirm } = this.context
    const { onRemove } = this.props
    const handler = onRemove.bind(this, section, block)
    confirm.open('Are you sure you want to delete this block?', handler)
  }

}

export default Canvas
