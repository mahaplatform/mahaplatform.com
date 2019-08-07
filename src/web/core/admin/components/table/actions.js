import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Button from '../button'
import React from 'react'

class Actions extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    items: PropTypes.array,
    record: PropTypes.object
  }

  state = {
    show: false
  }

  _handleClose = this._handleClose.bind(this)
  _handleOpen = this._handleOpen.bind(this)

  render() {
    const { items } = this.props
    const { position, show } = this.state
    return (
      <td className="collapsing mobile maha-table-actions" onMouseLeave={ this._handleClose } onClick={ this._handleOpen }>
        <div className="maha-table-actions-icon">
          <i className="fa fa-fw fa-ellipsis-v" />
          <CSSTransition in={ show } classNames="opacity" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
            <div className="maha-table-actions-overlay" onClick={ this._handleClose }/>
          </CSSTransition>
          <CSSTransition in={ show } classNames="translatey" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
            <div className={`maha-table-actions-dropdown ${position}`} onMouseLeave={ this._handleClose }>
              { items.map((item, index) => (
                <Button key={`action_${index}`} { ...this._getButton(item) }/>
              ))}
              <div className="maha-table-actions-item" onClick={ this._handleClose }>
                Cancel
              </div>
            </div>
          </CSSTransition>
        </div>
      </td>
    )
  }

  _getButton(item){
    return {
      ...item,
      className: 'maha-table-actions-item',
      onDone: this._handleClose
    }
  }

  _handleClose(e) {
    this.setState({
      show: false
    })
    if(e) e.stopPropagation()
  }

  _handleOpen(e) {
    this.setState({
      show: true
    })
    if(e) e.stopPropagation()
  }

}

export default Actions
