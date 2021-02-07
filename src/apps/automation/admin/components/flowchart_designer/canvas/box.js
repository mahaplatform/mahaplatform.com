import Connector from './connector'
import PropTypes from 'prop-types'
import Trunk from './trunk'
import React from 'react'
import Add from './add'
import _ from 'lodash'

class Box extends React.PureComponent {

  static contextTypes = {
    confirm: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.string,
    answer: PropTypes.string,
    box: PropTypes.object,
    blocks: PropTypes.array,
    delta: PropTypes.number,
    editable: PropTypes.bool,
    expanded: PropTypes.array,
    fields: PropTypes.array,
    hovering: PropTypes.object,
    parent: PropTypes.string,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onExpand: PropTypes.func,
    onHover: PropTypes.func,
    onNew: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleEdit = this._handleEdit.bind(this)
  _handleExpand = this._handleExpand.bind(this)
  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { active, box, editable, expanded } = this.props
    const block = this._getBlock()
    const { icon, label } = block
    const { code, config, branches, type } = box
    return (
      <div className={ this._getClass(box) }>
        { block.type !== 'trigger' &&
          <Add { ...this._getAdd() } />
        }
        <div className="flowchart-box-padding">
          <div className={ this._getBoxClass() }>
            { editable && (code === active || !_.includes(['trigger','ending'], type)) &&
              <div className="flowchart-box-highlight" />
            }
            { editable && !_.includes(['trigger','ending'], type) &&
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
            <div className={`flowchart-box-icon ${type}`}>
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
          { branches && branches.length > 0 &&
            <div className="flowchart-branches-container" >
              <Connector type="vertical" />
              <div className="flowchart-branches-expander" onClick={ this._handleExpand } data-tooltip="Expand options" data-position="top center" data-inverted="true">
                <i className="fa fa-ellipsis-h" />
              </div>
              { _.includes(expanded, code) &&
                <>
                  <Connector type="vertical" />
                  <div className="flowchart-branches">
                    { branches.map((branch, index) => (
                      <div className="flowchart-branch" key={`options_${index}`}>
                        <Connector type={ this._getTopConnector(branches, index) } />
                        <div className="flowchart-branch-label" data-tooltip={ branch.tooltip} data-position="top center" data-inverted="true">
                          <div className="flowchart-branch-label-box" title={ branch.label }>
                            { branch.label }
                          </div>
                        </div>
                        <Trunk { ...this._getTrunk(branch) } />
                        <Connector type={ this._getBottomConnector(branches, index) } />
                      </div>
                    )) }
                  </div>
                </>
              }
            </div>
          }
        </div>
      </div>
    )
  }

  _getTopConnector(branches, index) {
    if(branches.length === 1) return 'vertical'
    if(index === 0) return 'upper_left'
    if(index === branches.length-1) return 'upper_right'
    return 'horizontal_down'
  }

  _getBottomConnector(branches, index) {
    if(branches.length === 1) return 'vertical'
    if(index === 0) return 'lower_left'
    if(index === branches.length-1) return 'lower_right'
    return 'horizontal_up'
  }

  _getAdd() {
    const { answer, blocks, delta, editable, parent, onAdd, onNew } = this.props
    return {
      answer,
      blocks,
      delta,
      editable,
      parent,
      onAdd,
      onNew
    }
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

  _getEditButton() {
    return {
      icon: 'pencil',
      className: 'flowchart-box-action',
      handler: this._handleEdit
    }
  }

  _getExpander() {
    const { expanded } =this.state
    return expanded ? 'minus' : 'plus'
  }

  _getRemoveButton() {
    return {
      icon: 'trash',
      className: 'flowchart-box-action',
      handler: this._handleRemove
    }
  }

  _getToken(config) {
    const { fields } = this.props
    return {
      ...config,
      fields
    }
  }

  _getTrunk(option) {
    const { active, blocks, box, editable, expanded, fields, hovering, onAdd, onEdit, onExpand, onHover, onNew, onRemove } = this.props
    return {
      active,
      answer: option.code,
      boxes: option.then,
      blocks,
      editable,
      expanded,
      fields,
      parent: box.code,
      hovering,
      onAdd,
      onEdit,
      onExpand,
      onHover,
      onNew,
      onRemove
    }
  }

  _handleEdit() {
    const { box } = this.props
    this.props.onEdit(box.code)
  }

  _handleExpand() {
    const { box } = this.props
    this.props.onExpand(box.code)
  }

  _handleRemove() {
    const { box } = this.props
    const message = 'Are you sure you want to delete this step?'
    this.context.confirm.open(message, () => {
      this.props.onRemove(box)
    })
  }

}

export default Box
