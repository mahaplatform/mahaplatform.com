import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.Component {

  static contextTypes = {
    confirm: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    config: PropTypes.object,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onClone: PropTypes.func,
    onEdit: PropTypes.func,
    onMove: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
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
    if(active !== prevProps.active) {
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
    return {
      ref: node => this.preview = node,
      src: '/apps/forms/form/index.html'
    }
  }

  _handleAdd({ field, index }) {
    this.props.onAdd(index, field)
  }

  _handleClone({ index }) {
    const code = _.random(100000000, 999999999).toString(36)
    this.props.onClone(index, code)
  }

  _handleEdit({ index }) {
    this.props.onEdit(index)
  }

  _handleHighlight() {
    const { active } = this.props
    this.pasteur.send('highlight', { active })
  }

  _handleMove({ from, to }) {
    this.props.onMove(from, to)
  }

  _handleRemove({ index }) {
    this.context.confirm.open('Are you sure you want to remove this field? If there are responses, you will loose any associated data.', () => {
      this.props.onRemove(index)
    })
  }

  _handleRender() {
    const { config } = this.props
    this.pasteur.send('update', { config })
  }

}

export default Canvas
