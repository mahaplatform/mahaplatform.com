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
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    connectDropTarget: PropTypes.func,
    connectDragPreview: PropTypes.func,
    connectDragSource: PropTypes.func,
    card: PropTypes.object,
    index: PropTypes.number,
    managing: PropTypes.bool,
    panel: PropTypes.object,
    onExpand: PropTypes.func,
    onMove: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleEdit = this._handleEdit.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleExpand = this._handleExpand.bind(this)
  _handleRemove = this._handleRemove.bind(this)

  render() {
    const { connectDropTarget, connectDragPreview, connectDragSource } = this.props
    const { user } = this.context.admin
    const { panel, managing } = this.props
    const result = (
      <div className="maha-dashboard-card-container">
        <Stack { ...this._getStack() } />
      </div>
    )
    if(!managing || user.id !== panel.owner.id) return result
    return connectDragSource(connectDropTarget(connectDragPreview(result)))
  }

  componentDidMount() {
    const type = this._getCardType()
    this._handlePush(type.component, this._getComponent.bind(this))
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
      controls: this._getControls(),
      config: card.config
    }
  }

  _getControls() {
    const { user } = this.context.admin
    const { managing, panel } = this.props
    const type = this._getCardType()
    if(managing && user.id === panel.owner.id) {
      return (
        <div className="maha-dashboard-card-header-controls">
          { type.edit !== undefined &&
            <div className="maha-dashboard-card-header-control" onClick={ this._handleEdit }>
              <i className="fa fa-ellipsis-v" />
            </div>
          }
          <div className="maha-dashboard-card-header-control" onClick={ this._handleRemove }>
            <i className="fa fa-times" />
          </div>
        </div>
      )
    }
    return (
      <div className="maha-dashboard-card-header-controls">
        <div className="maha-dashboard-card-header-control" onClick={ this._handleExpand }>
          <i className="fa fa-expand" />
        </div>
      </div>
    )
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleEdit() {
    const { card, panel } = this.props
    const type = this._getCardType()
    this.context.modal.open(<type.edit card={ card } panel={ panel } />)
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

  _handleExpand() {
    const { card } = this.props
    this.props.onExpand(card.id)
  }

  _handleRemove() {
    const { card, panel } = this.props
    this.context.network.request({
      confirm: 'Are you sure you want to remove this card?',
      endpoint: `/api/admin/dashboard/panels/${panel.id}/cards/${card.id}`,
      method: 'DELETE'
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
  },
  drop: (props, monitor, component) => {
    console.log('drop', { props, monitor, component })
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
