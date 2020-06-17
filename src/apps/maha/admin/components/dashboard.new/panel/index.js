import elementResizeEvent from 'element-resize-event'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import New from './newcard'
import React from 'react'
import Card from './card'
import _ from 'lodash'

class Panel extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    panel: PropTypes.object,
    onMove: PropTypes.func,
    onToggle: PropTypes.func
  }

  body = null

  state = {
    columns: 'one',
    expanded: null,
    managing: false
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleExpand = this._handleExpand.bind(this)
  _handleManage = this._handleManage.bind(this)
  _handleMove = this._handleMove.bind(this)
  _handleResize = this._handleResize.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { user } = this.context.admin
    const { managing } = this.state
    const { panel } = this.props
    const expanded = this._getExpanded()
    return (
      <div className={ this._getClass() } ref={ node => this.body = node }>
        <div className="maha-dashboard-header">
          <div className="maha-dashboard-header-toggle" onClick={ this._handleToggle }>
            <i className="fa fa-bars" />
          </div>
          <div className="maha-dashboard-header-body">
            { panel.title }
          </div>
          { user.id === panel.owner.id &&
            <Button { ...this._getManage() } />
          }
        </div>
        <div className="maha-dashboard-panel">
          { expanded &&
            <div className="maha-dashboard-panel-item full" key={`card_${expanded.id}`}>
              <Card { ...this._getCard(expanded) } />
            </div>
          }
          { !expanded && panel.cards.map((card, cindex) => (
            <div className="maha-dashboard-panel-item one" key={`card_${card.id}`}>
              <Card { ...this._getCard(card, cindex) } />
            </div>
          ))}
          { (!expanded && managing) &&
            <div className="maha-dashboard-panel-item one">
              <div className="maha-dashboard-panel-add" onClick={ this._handleAdd }>
                <div className="maha-dashboard-panel-add-inner">
                  <div className="maha-dashboard-panel-add-content">
                    <i className="fa fa-plus" />
                    Add a Card
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this._handleResize()
    elementResizeEvent(this.body, this._handleResize)
  }

  _getCard(card, index) {
    const { managing } = this.state
    const { panel } = this.props
    return {
      card,
      index,
      managing,
      panel,
      onExpand: this._handleExpand,
      onMove: this._handleMove
    }
  }

  _getClass() {
    const { columns, expanded } = this.state
    const classes = ['maha-dashboard-body']
    classes.push(expanded !== null ? 'expanded': 'collapsed')
    classes.push(columns)
    return classes.join(' ')
  }

  _getColumns() {
    const { expanded } = this.state
    const { clientWidth } = this.body
    if(expanded !== null) return 'expanded'
    if(clientWidth > 1868) return 'six'
    if(clientWidth > 1568) return 'five'
    if(clientWidth > 1170) return 'four'
    if(clientWidth > 768) return 'three'
    if(clientWidth > 414) return 'two'
    return 'one'
  }

  _getExpanded() {
    const { panel } = this.props
    const { expanded } = this.state
    return _.find(panel.cards, {
      id: expanded
    })
  }

  _getManage() {
    const { managing } = this.state
    const classes = ['maha-dashboard-header-action']
    if(managing) classes.push('active')
    return {
      label: <i className="fa fa-gear" />,
      className: classes.join(' '),
      handler: this._handleManage
    }
  }

  _handleAdd() {
    const { panel } = this.props
    this.context.modal.open(<New panel={ panel } />)
  }

  _handleExpand(id) {
    const expanded = this.state.expanded == null ? id : null
    this.setState({ expanded })
  }

  _handleManage() {
    const { managing } = this.state
    this.setState({
      managing: !managing
    })
  }

  _handleMove(from, to) {
    this.props.onMove(from, to)
  }

  _handleResize() {
    this.setState({
      columns: this._getColumns()
    })
  }

  _handleToggle() {
    this.props.onToggle()
  }

}

export default Panel
