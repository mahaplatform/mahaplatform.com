import PropTypes from 'prop-types'
import Pasteur from 'pasteur'
import React from 'react'
import _ from 'lodash'

class Canvas extends React.Component {

  static contextTypes = {}

  static propTypes = {
    active: PropTypes.object,
    config: PropTypes.object,
    onAdd: PropTypes.func,
    onChange: PropTypes.func,
    onClone: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func
  }

  static defaultProps = {}

  preview = null

  _handleAdd = this._handleAdd.bind(this)
  _handleClone = this._handleClone.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleHighlight = this._handleHighlight.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleRender = _.throttle(this._handleRender.bind(this), 250, { leading: true, trailing: false })

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
    return {
      ref: node => this.preview = node,
      src: '/templates/form.html'
    }
  }

  _handleRender() {
    const { config } = this.props
    this.pasteur.send('designer', 'update', { config })
  }

  _handleAdd({ section, type, index }) {
    const content_type = _.find(types, { type })
    this.props.onAdd(section, index, {
      type: content_type.type,
      ...content_type.config
    })
  }

  _handleClone({ section, block }) {
    this.props.onClone(section, block)
  }

  _handleEdit({ section, block }) {
    this.props.onEdit(section, block)
  }

  _handleHighlight() {
    const { active } = this.props
    this.pasteur.send('designer', 'highlight', { active })
  }

  _handleRemove({ section, block }) {
    this.props.onRemove(section, block)
  }

}

export default Canvas
