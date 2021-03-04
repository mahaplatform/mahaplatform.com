import { TransitionGroup, CSSTransition } from 'react-transition-group'
import AssigneeToken from '../../../tokens/assignee'
import PropTypes from 'prop-types'
import React from 'react'

class Assigned extends React.Component {

  static contextTypes = {}

  static propTypes = {
    assigned: PropTypes.array,
    onRemove: PropTypes.func
  }

  static defaultProps = {
  }

  render() {
    const { assigned } = this.props
    return (
      <div className="maha-assignment-assigned">
        <div className="maha-assignment-list" ref={ node => this.list = node}>
          <TransitionGroup>
            { assigned.map((assignment, index) => (
              <CSSTransition classNames="expanded" timeout={ 1000 } exit={ false } key={`assigned_${index}`}>
                <div className="maha-assignment-item" >
                  <div className="maha-assignment-item-token">
                    <AssigneeToken { ...assignment } />
                  </div>
                  <div className="maha-assignment-item-icon" onClick={ this._handleRemove.bind(this, index)}>
                    <i className="fa fa-fw fa-times" />
                  </div>
                </div>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    )
  }

  _handleRemove(index) {
    this.props.onRemove(index)
  }

}

export default Assigned
