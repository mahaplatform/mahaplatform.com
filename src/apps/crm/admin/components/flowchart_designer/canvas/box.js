import PropTypes from 'prop-types'
import Trunk from './trunk'
import React from 'react'
import _ from 'lodash'

class Box extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    box: PropTypes.object,
    blocks: PropTypes.array,
    fields: PropTypes.array,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleDragStart = this._handleDragStart.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleRemove = this._handleRemove.bind(this)

  render() {
    const block = this._getBlock()
    const { icon, label } = block
    const { active, box } = this.props
    const { code, type, config, options } = box
    return (
      <div className="flowchart-box-padding">
        <div { ...this._getBox() }>
          { (code === active || !_.includes(['trigger','ending'], type)) &&
            <div className="flowchart-box-highlight" />
          }
          { !_.includes(['trigger','ending'], type) &&
            <div className="flowchart-box-actions">
              <div className="flowchart-box-spacer"></div>
              <div className="flowchart-box-action" onClick={ this._handleEdit }>
                <i className="fa fa-pencil" />
              </div>
              <div className="flowchart-box-action" onClick={ this._handleRemove }>
                <i className="fa fa-trash" />
              </div>
            </div>
          }
          <div className={`flowchart-box-icon flowchart-designer-icon-${type}`}>
            <i className={`fa fa-${icon}`} />
          </div>
          <div className="flowchart-box-label">
            { label }
          </div>
          { block.token &&
            <div className="flowchart-box-details">
              <block.token { ...this._getToken(config) } />
            </div>
          }
        </div>
        { type === 'conditional' &&
          <div className="flowchart-connector">
            <div className="flowchart-line" />
          </div>
        }
        { type === 'conditional' &&
          <div className="flowchart-branches" data-parent={ code }>
            { options.length > 1 ? options.map((option, index) => (
              <div className="flowchart-branch" key={`options_${index}`} data-answer={ option.value }>
                <div className="flowchart-line">
                  <div className="flowchart-line-label">
                    { option.text }
                  </div>
                </div>
                <Trunk { ...this._getTrunk(option) } />
              </div>
            )) : <Trunk { ...this._getTrunk(options[0]) } /> }
          </div>
        }
      </div>
    )
  }

  _getBox() {
    return {
      className: this._getClass(),
      draggable: true,
      onDragStart: this._handleDragStart
    }
  }

  _getBlock() {
    const { blocks, box } = this.props
    const { action, type } = box
    if(action) return _.find(blocks, { type, action })
    return _.find(blocks, { type })
  }

  _getClass() {
    const { active, box } = this.props
    const { code, type } = box
    const classes = ['flowchart-box-item', `flowchart-box-${type}`]
    if(active === code) classes.push('active')
    return classes.join(' ')
  }

  _getToken(config) {
    const { fields } = this.props
    return {
      ...config,
      fields
    }
  }

  _getTrunk(option) {
    const { active, blocks, fields, onAdd, onEdit, onRemove } = this.props
    return {
      active,
      boxes: option.then,
      blocks,
      fields,
      onAdd,
      onEdit,
      onRemove
    }
  }

  _handleDragStart(e) {
    const { box } = this.props
    e.dataTransfer.dropEffect = 'all'
    e.dataTransfer.setData('code', box.code)
  }

  _handleEdit() {
    const { box } = this.props
    this.props.onEdit(box.code)
  }

  _handleRemove() {
    const { box } = this.props
    this.props.onRemove(box)
  }

}

export default Box
