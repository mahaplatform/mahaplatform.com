import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { types } from '../../types'
import React from 'react'

class Content extends React.Component {

  static contextTypes = {}

  static propTypes = {
    cid: PropTypes.string,
    config: PropTypes.object
  }

  static defaultProps = {}

  _handleDragStart = this._handleDragStart.bind(this)

  render() {
    return (
      <div className="email-designer-content-types">
        { types.map((type, index) => (
          <div className="email-designer-content-type" key={`type_${index}`} { ...this._getContentType(type) }>
            <div className="email-designer-content-type-icon">
              <i className={`fa fa-fw fa-${ type.icon }`} />
            </div>
            <div className="email-designer-content-type-label">
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
    e.dataTransfer.dropEffect = 'all'
    e.dataTransfer.setData('type', type.type)
  }

}

const mapStateToProps = (state, props) => ({
  config: state.crm.email_designer[props.cid].config
})

export default connect(mapStateToProps)(Content)
