import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.Component {

  static propTypes = {
    active: PropTypes.number,
    config: PropTypes.object,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onClone: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdate: PropTypes.func
  }

  preview = null

  _handleAdd = this._handleAdd.bind(this)
  _handleClone = this._handleClone.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleHighlight = this._handleHighlight.bind(this)
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
      targetName: 'designerCanvas',
      services: {
        designer: {
          add: this._handleAdd,
          clone: this._handleClone,
          edit: this._handleEdit,
          remove: this._handleRemove,
          ready: this._handleRender
        }
      }
    })
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
      src: '/crm/form/index.html'
    }
  }

  _handleAdd({ type, index }) {
    this.props.onAdd(index, type)
  }

  _handleClone({ index }) {
    this.props.onClone(index)
  }

  _handleEdit({ index }) {
    this.props.onEdit(index)
  }

  _handleHighlight() {
    const { active } = this.props
    this.pasteur.send('designer', 'highlight', { active })
  }

  _handleRemove({ index }) {
    this.props.onRemove(index)
  }

  _handleRender() {
    const { config } = this.props
    this.pasteur.send('designer', 'update', { config })
  }

}

export default Canvas
