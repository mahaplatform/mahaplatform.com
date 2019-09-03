import PropTypes from 'prop-types'
import Content from './content'
import Design from './design'
import React from 'react'

class Sidebar extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  static defaultProps = {}

  render() {

    return (
      <div className="designer-sidebar-panel">
        <div className="designer-sidebar-panel-header">
          <div className="ui two item menu">
            <a className="active item">Content</a>
            <a className="item">Design</a>
          </div>
        </div>
        <div className="designer-sidebar-panel-body">
          <Design { ...this._getDesign() } />
        </div>
      </div>
    )
  }

  _getDesign() {
    const { onPop, onPush } = this.props
    return {
      onPop,
      onPush
    }
  }

}

export default Sidebar
