import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Button from '../button'
import React from 'react'

class Tasks extends React.Component {

  static childContextTypes = {
    tasks: PropTypes.object
  }

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {
    access: PropTypes.func,
    children: PropTypes.any,
    items: PropTypes.array,
    open: PropTypes.bool,
    title: PropTypes.string,
    onClear: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    const { children, items, open, title } = this.props
    return ([
      children,
      <CSSTransition key="maha-tasks-overlay" in={ open } classNames="expanded" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="maha-tasks-overlay" onClick={ this._handleClose } />
      </CSSTransition>,
      <CSSTransition key="maha-tasks-list" in={ open } classNames="expanded" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="maha-tasks-list">
          { title &&
            <div className="maha-tasks-list-header">
              { title }
            </div>
          }
          <div className="maha-tasks-list-body">
            { items && items.map((item, index) => (
              <div className="maha-tasks-list-item" key={`task_${index}`}>
                <Button { ...this._getButton(item) }/>
              </div>
            )) }
          </div>
          <div className="maha-tasks-cancel" onClick={ this._handleClose }>
            Cancel
          </div>
        </div>
      </CSSTransition>
    ])
  }

  componentDidUpdate(prevProps) {
    const { open, onClear } = this.props
    if(open !== prevProps.open && !open) {
      setTimeout(onClear, 500)
    }
  }

  getChildContext() {
    const { onOpen, onClose } = this.props
    return {
      tasks: {
        open: onOpen,
        close: onClose
      }
    }
  }

  _getButton(item){
    return {
      ...item,
      className: 'maha-task',
      onDone: this._handleClose.bind(this)
    }
  }

  _handleClose() {
    this.props.onClose()
  }

}

export default Tasks
