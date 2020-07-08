import PropTypes from 'prop-types'
import Buttons from '../buttons'
import React from 'react'
import _ from 'lodash'

class ModalPanel extends React.Component {

  static propTypes = {
    alert: PropTypes.any,
    buttons: PropTypes.array,
    children: PropTypes.any,
    className: PropTypes.string,
    color: PropTypes.string,
    instructions: PropTypes.any,
    leftEnabled: PropTypes.bool,
    leftItems: PropTypes.array,
    rightEnabled: PropTypes.bool,
    rightItems: PropTypes.array,
    showHeader: PropTypes.bool,
    title: PropTypes.string
  }

  static defaultProps = {
    showHeader: true
  }

  render() {
    const { alert, buttons, instructions, leftItems, rightItems, showHeader, title } = this.props
    return (
      <div className={ this._getClass() }>
        { showHeader &&
          <div className="maha-modal-panel-header">
            { leftItems &&
              <div className="maha-modal-panel-header-navigation">
                { leftItems.map((item,index) => (
                  <div key={`left_${index}`} { ...this._getItem(item) }>
                    { this._getElement(item) }
                  </div>
                )) }
              </div>
            }
            <div className="maha-modal-panel-header-title">
              { title }
            </div>
            { rightItems &&
              <div className="maha-modal-panel-header-navigation">
                { rightItems.map((item,index) => (
                  <div key={`right_${index}`} { ...this._getItem(item) }>
                    { this._getElement(item) }
                  </div>
                )) }
              </div>
            }
          </div>
        }
        { instructions &&
          <div className="maha-modal-panel-instructions">
            { instructions }
          </div>
        }
        <div className="maha-modal-panel-body">
          { this.props.children }
        </div>
        { buttons &&
          <div className="maha-modal-panel-footer">
            <Buttons { ...this._getButtons() } />
          </div>
        }
        { alert &&
          <div className="maha-modal-panel-alert">
            { alert }
          </div>
        }
      </div>
    )
  }

  _getButtons() {
    const { buttons } = this.props
    return {
      buttons
    }
  }

  _getClass() {
    const { className, color } = this.props
    const classes = ['maha-modal-panel']
    if(className) classes.push(className)
    if(color) classes.push(color)
    return classes.join(' ')
  }

  _getElement(item) {
    if(item.component) return _.isFunction(item.component) ? React.createElement(item.component) : item.component
    if(item.icon) return <div className="maha-modal-panel-header-navigation-button"><i className={ `fa fa-fw fa-${item.icon}` } /></div>
    if(item.label) return <div className="maha-modal-panel-header-navigation-button"><span>{ item.label }</span></div>
  }

  _getItem(item) {
    return {
      className: 'maha-modal-panel-header-navigation-item',
      onClick: item.handler,
      ...this._getToolTip(item.tooltip)
    }
  }

  _getLeftClass() {
    const { leftEnabled } = this.props
    const classes = ['maha-modal-panel-header-navigation']
    if(!leftEnabled) classes.push('disabled')
    return classes.join(' ')
  }

  _getRightClass() {
    const { rightEnabled } = this.props
    const classes = ['maha-modal-panel-header-navigation']
    if(!rightEnabled) classes.push('disabled')
    return classes.join(' ')
  }

  _getToolTip(tooltip) {
    if(!tooltip) return {}
    return {
      'data-tooltip': _.isString(tooltip) ? tooltip : tooltip.title,
      'data-position': _.isString(tooltip) ? 'bottom right' : tooltip.position,
      'data-inverted': ''
    }
  }


}

export default ModalPanel
