import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import { allowed } from './selectors'
import PropTypes from 'prop-types'
import Button from '../button'
import React from 'react'

class Tasks extends React.Component {

  static childContextTypes = {
    tasks: PropTypes.object
  }

  static contextTypes = {
    drawer: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    access: PropTypes.func,
    allowed: PropTypes.any,
    children: PropTypes.any,
    items: PropTypes.array,
    open: PropTypes.bool,
    rights: PropTypes.array,
    onClear: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func
  }

  _handleClose = this._handleClose.bind(this)

  render() {
    const { children, allowed, open } = this.props
    return ([
      children,
      <CSSTransition key="maha-tasks-overlay" in={ open } classNames="expanded" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="maha-tasks-overlay" onClick={ this._handleClose } />
      </CSSTransition>,
      <CSSTransition key="maha-tasks-list" in={ open } classNames="expanded" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
        <div className="maha-tasks-list">
          <div className="maha-tasks-list-body">
            { allowed && allowed.map((item, index) => (
              <Button key={`task_${index}`} { ...this._getButton(item) }/>
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

const mapStateToProps = (state, props) => ({
  allowed: allowed(state, props)
})

export default connect(mapStateToProps)(Tasks)
