import { DragSource, DropTarget } from 'react-dnd'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Card extends React.Component {

  static childContextTypes = {
    card: PropTypes.object
  }

  static contextTypes = {
    admin: PropTypes.object,
    configuration: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    card: PropTypes.object,
    panel: PropTypes.object,
    reordering: PropTypes.bool
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleTasks = this._handleTasks.bind(this)

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource } = this.props
    const { user } = this.context.admin
    const { card, panel, reordering } = this.props
    const result = (
      <div className="maha-dashboard-card-container">
        <div className="maha-dashboard-card">
          <div className="maha-dashboard-card-header">
            <div className="maha-dashboard-card-header-app">
              { card.type.app ?
                <div className={ `maha-dashboard-card-appicon ${card.type.app.color}` }>
                  <i className={ `fa fa-${card.type.app.icon}` } />
                </div> :
                <div className="maha-dashboard-card-appicon blue">
                  <i className="fa fa-bars" />
                </div>
              }
            </div>
            <div className="maha-dashboard-card-header-details">
              <div className="maha-dashboard-card-header-details-title">
                { card.title }
              </div>
              <div className="maha-dashboard-card-header-details-cardtitle">
                { card.type.title }
              </div>
            </div>
            <div className="maha-dashboard-card-header-icon" onClick={ this._handleTasks }>
              <i className="fa fa-ellipsis-v" />
            </div>
          </div>
          <div className="maha-dashboard-card-body">
            <Stack { ...this._getStack() } />
          </div>
        </div>
      </div>
    )
    if(!reordering || user.id !== panel.owner.id) return result
    return connectDragSource(connectDropTarget(connectDragPreview(result)))
  }

  componentDidMount() {
    const type = this._getCardType()
    this._handlePush(type.component, this._getComponent())
  }

  getChildContext() {
    return {
      card: {
        pop: this._handlePop,
        push: this._handlePush
      }
    }
  }

  _getCardType() {
    const { card } = this.props
    const { dashboardCards } = this.context.configuration
    return dashboardCards.find(dashboardCard => {
      return dashboardCard.code === card.type.code
    })
  }

  _getComponent() {
    const { card } = this.props
    return {
      config: card.config
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

  _handleTasks() {
    const { card, panel } = this.props
    const type = this._getCardType()
    this.context.tasks.open({
      items: [
        {
          label: 'Edit Card',
          modal: <type.edit config={ card.config } />
        }, {
          label: 'Remove Card',
          confirm: 'Are you sure you want to remove this card?',
          request: {
            endpoint: `/api/admin/dashboard/panels/${panel.id}/cards/${card.id}`,
            method: 'DELETE'
          }
        }
      ]
    })
  }

}

const source = {
  beginDrag: (props) => ({
    index: props.index,
    onMove: props.onMove
  })
}

const target = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index
    if (dragIndex === hoverIndex) return
    props.onMove(dragIndex, hoverIndex)
    monitor.getItem().index = hoverIndex
  }
}

const sourceCollector = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
})

const targetCollector = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
})

Card = DragSource('ITEM', source, sourceCollector)(Card)
Card = DropTarget('ITEM', target, targetCollector)(Card)

export default Card
