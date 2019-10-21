import PropTypes from 'prop-types'
import Trunk from './trunk'
import React from 'react'
import _ from 'lodash'

class Box extends React.PureComponent {

  static propTypes = {
    active: PropTypes.string,
    box: PropTypes.object,
    blocks: PropTypes.array,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleEdit = this._handleEdit.bind(this)
  _handleRemove = this._handleRemove.bind(this)

  render() {
    const block = this._getBlock()
    const { icon, label } = block
    const { active, box } = this.props
    const { code, options, type, config } = box
    return (
      <div className="workflow-box-padding">
        <div className={ this._getClass() }>
          { (code === active || !_.includes(['trigger','ending'], type)) &&
            <div className="workflow-box-highlight" />
          }
          { !_.includes(['trigger','ending'], type) &&
            <div className="workflow-box-actions">
              <div className="workflow-box-spacer"></div>
              <div className="workflow-box-action" onClick={ this._handleEdit }>
                <i className="fa fa-pencil" />
              </div>
              <div className="workflow-box-action" onClick={ this._handleRemove }>
                <i className="fa fa-trash" />
              </div>
            </div>
          }
          <div className={`workflow-box-icon workflow-designer-icon-${type}`}>
            <i className={`fa fa-${icon}`} />
          </div>
          <div className="workflow-box-label">
            { label }
          </div>
          { block.details &&
            <div className="workflow-box-details">
              <block.details { ...config } />
            </div>
          }
        </div>
        { type === 'conditional' &&
          <div className="workflow-connector">
            <div className="workflow-line" />
          </div>
        }
        { type === 'conditional' &&
          <div className="workflow-branches" data-parent={ code }>
            { options.map((option, index) => (
              <div className="workflow-branch" key={`options_${index}`} data-answer={ option.value }>
                <div className="workflow-line">
                  <div className="workflow-line-label">
                    { option.text }
                  </div>
                </div>
                <Trunk { ...this._getTrunk(option) } />
              </div>
            )) }
          </div>
        }
      </div>
    )
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
    const classes = ['workflow-box-item', `workflow-box-${type}`]
    if(active === code) classes.push('active')
    return classes.join(' ')
  }

  _getTrunk(option) {
    const { active, blocks, onAdd, onEdit, onRemove } = this.props
    return {
      active,
      boxes: option.then,
      blocks,
      onAdd,
      onEdit,
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

export default Box
