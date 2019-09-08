import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { types } from '../../types'
import React from 'react'

class Content extends React.Component {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  _handleDragStart = this._handleDragStart.bind(this)

  render() {
    return (
      <div className="content-types">
        { types.map((type, index) => (
          <div className="content-type" key={`type_${index}`} { ...this._getContentType(type) }>
            <div className="content-type-icon">
              <i className={`fa fa-fw fa-${ type.icon }`} />
            </div>
            <div className="content-type-label">
              { type.label }
            </div>
          </div>
        )) }
      </div>
    )
  }

  _getContentType(type) {
    return {
      draggable: true,
      onDragStart: this._handleDragStart.bind(this, type)
    }
  }

  _handleDragStart(type, e) {
    e.dataTransfer.setData('type', type.type)
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.designer.config
})

export default connect(mapStateToProps)(Content)
