import Conditional from './conditional'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Box extends React.PureComponent {

  static propTypes = {
    action: PropTypes.string,
    blocks: PropTypes.array,
    type: PropTypes.string
  }

  render() {
    const { type } = this.props
    if(type === 'conditional') return <Conditional { ...this.props } />
    const { icon, label } = this._getBlock()
    return (
      <div className="flowchart-box-padding">
        <div className={`flowchart-box flowchart-box-${type}`}>
          <div className={`flowchart-box-icon workflow-designer-icon-${type}`}>
            <i className={`fa fa-${icon}`} />
          </div>
          <div className="flowchart-box-label">
            { label }
          </div>
        </div>
      </div>
    )
  }

  _getBlock() {
    const { action, blocks, type } = this.props
    if(action) return _.find(blocks, { type, action })
    return _.find(blocks, { type })
  }

}

export default Box
