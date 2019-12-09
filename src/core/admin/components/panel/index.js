import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Panel extends React.Component {

  static propTypes = {
    component: PropTypes.any,
    header: PropTypes.any
  }

  render() {
    const { header, component } = this.props
    return (
      <div className="maha-panel">
        { header &&
          <div className="maha-panel-header">
            <div className="maha-panel-inner">
              { _.isFunction() ? React.createElement(header) : header }
            </div>
          </div>
        }
        <div className="maha-panel-body">
          <div className="maha-panel-inner">
            { _.isFunction(component) ? React.createElement(component) : component }
          </div>
        </div>
      </div>
    )
  }

}

export default Panel
