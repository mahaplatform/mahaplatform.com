import PropTypes from 'prop-types'
import Trunk from './trunk'
import React from 'react'
import _ from 'lodash'

class Box extends React.PureComponent {

  static propTypes = {
    action: PropTypes.string,
    answer: PropTypes.string,
    blocks: PropTypes.array,
    code: PropTypes.string,
    delta: PropTypes.number,
    options: PropTypes.array,
    parent: PropTypes.string,
    type: PropTypes.string,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func
  }

  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { icon, label } = this._getBlock()
    const { code, options, type } = this.props
    return (
      <div className="workflow-box-padding">
        <div className={`workflow-box-item workflow-box-${type}`}>
          { !_.includes(['trigger','ending'], type) &&
            <div className="workflow-box-highlight" />
          }
          { !_.includes(['trigger','ending'], type) &&
            <div className="workflow-box-actions">
              <div className="workflow-box-spacer"></div>
              <div className="workflow-box-action">
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
    const { action, blocks, type } = this.props
    if(action) return _.find(blocks, { type, action })
    return _.find(blocks, { type })
  }

  _getTrunk(option) {
    const { blocks, onAdd, onRemove } = this.props
    return {
      boxes: option.then,
      blocks,
      onAdd,
      onRemove
    }
  }

  _handleRemove() {
    const { parent, answer, delta, code } = this.props
    this.props.onRemove({ parent, answer, delta, code })
  }

}

export default Box
