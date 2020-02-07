import { DropTarget } from 'react-dnd'
import PropTypes from 'prop-types'
import Target from './target'
import Trunk from './trunk'
import React from 'react'
import _ from 'lodash'

class Box extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    answer: PropTypes.string,
    box: PropTypes.object,
    blocks: PropTypes.array,
    connectDropTarget: PropTypes.func,
    delta: PropTypes.number,
    fields: PropTypes.array,
    hovering: PropTypes.object,
    parent: PropTypes.string,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onHover: PropTypes.func,
    onMove: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleEdit = this._handleEdit.bind(this)
  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { active, box, connectDropTarget } = this.props
    const { answer, delta, hovering, parent } = this.props
    const block = this._getBlock()
    const { icon, label } = block
    const { code, type, config, options } = box
    return connectDropTarget(
      <div className={ this._getClass(box) }>
        { hovering && parent === hovering.parent  && answer === hovering.answer && hovering.delta === delta &&
          <Target />
        }
        <div className="flowchart-box-padding">
          <div className={ this._getBoxClass() }>
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
          { type === 'conditional' && options.length > 0 &&
            <div className="flowchart-branches">
              { options.map((option, index) => (
                <div className="flowchart-branch" key={`options_${index}`}>
                  <div className="flowchart-branch-label">
                    <div className="flowchart-branch-label-box" title={ option.text }>
                      { option.text }
                    </div>
                  </div>
                  <Trunk { ...this._getTrunk(option) } />
                </div>
              )) }
            </div>
          }
        </div>
      </div>
    )
  }

  _getBlock() {
    const { blocks, box } = this.props
    const { action, type } = box
    if(action) return _.find(blocks, { type, action })
    return _.find(blocks, { type })
  }

  _getBoxClass() {
    const { active, box } = this.props
    const { code, type } = box
    const classes = ['flowchart-box-item', `flowchart-box-${type}`]
    if(active === code) classes.push('active')
    return classes.join(' ')
  }

  _getClass(box) {
    const classes = ['flowchart-segment', box.type]
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
    const { active, blocks, box, fields, hovering, onAdd, onEdit, onHover, onMove, onRemove } = this.props
    return {
      active,
      answer: option.code,
      boxes: option.then,
      blocks,
      fields,
      parent: box.code,
      hovering,
      onAdd,
      onEdit,
      onHover,
      onMove,
      onRemove
    }
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

const target = {
  hover(props, monitor, component) {
    if(monitor.isOver()) return
    const { answer, box, delta, parent } = props
    const hovering = box.type !== 'trigger' ? { answer, delta, parent } : null
    props.onHover(hovering)
  },
  drop(props, monitor, component) {
    if(monitor.didDrop()) return
    const block = monitor.getItem()
    const { answer, delta, parent } = props
    const { type, action } = block
    props.onAdd(type, action, parent, answer, delta)
  }
}

const targetCollector = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

Box = DropTarget('ITEM', target, targetCollector)(Box)

export default Box
