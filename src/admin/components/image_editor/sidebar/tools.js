import ModalPanel from '../../modal_panel'
import Orientation from './orientation'
import Adjustment from './adjustment'
import PropTypes from 'prop-types'
import Crop from './crop'
import Text from './text'
import React from 'react'

const tools = [
  { label: 'Cropping', icon: 'crop', component: Crop },
  { label: 'Adjustments', icon: 'sun-o', component: Adjustment },
  { label: 'Orientation', icon: 'repeat', component: Orientation },
  { label: 'Text', icon: 'font', component: Text }
]

class Tools extends React.Component {

  static propTypes = {
    asset: PropTypes.object,
    crop: PropTypes.object,
    orientation: PropTypes.object,
    transforms: PropTypes.array,
    onBack: PropTypes.func,
    onPopTransform: PropTypes.func,
    onPushTransform: PropTypes.func,
    onPush: PropTypes.func,
    onPop: PropTypes.func
  }

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-imageeditor-tools">
          { tools.map((tool, index) => (
            <div className="maha-imageeditor-tool" key={`tool_${index}`} onClick={ this._handleClick.bind(this, tool) }>
              <div className="maha-imageeditor-tool-icon">
                <i className={`fa fa-fw fa-${ tool.icon }`} />
              </div>
              <div className="maha-imageeditor-tool-label">
                { tool.label }
              </div>
              <div className="maha-imageeditor-tool-proceed">
                <i className="fa fa-fw fa-chevron-right" />
              </div>
            </div>
          )) }
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Tools',
      color: 'grey'
    }
  }

  _getTool(tool) {
    const { asset, crop, orientation, transforms, onPopTransform, onPushTransform, onPop} = this.props
    return {
      asset,
      crop,
      orientation,
      transforms,
      onPopTransform,
      onPushTransform,
      onBack: onPop
    }
  }

  _handleClick(tool) {
    this.props.onPush(tool.component, this._getTool.bind(this, tool))
  }

}

export default Tools
