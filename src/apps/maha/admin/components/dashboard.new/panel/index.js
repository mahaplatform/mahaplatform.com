import elementResizeEvent from 'element-resize-event'
import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import New from './newcard'
import Card from '../card'
import React from 'react'

class Panel extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    expanded: PropTypes.object,
    panel: PropTypes.object,
    stacked: PropTypes.bool,
    onExpand: PropTypes.func,
    onMove: PropTypes.func,
    onToggle: PropTypes.func
  }

  body = null

  state = {
    columns: 'one',
    managing: false
  }

  _handleAdd = this._handleAdd.bind(this)
  _handleManage = this._handleManage.bind(this)
  _handleMove = this._handleMove.bind(this)
  _handleResize = this._handleResize.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { expanded, panel, stacked } = this.props
    const { user } = this.context.admin
    const { managing } = this.state
    return (
      <div className={ this._getClass() } ref={ node => this.body = node }>
        { !expanded &&
          <div className="maha-dashboard-panel-header">
            { !stacked &&
              <div className="maha-dashboard-panel-header-toggle" onClick={ this._handleToggle }>
                <i className="fa fa-bars" />
              </div>
            }
            <div className="maha-dashboard-panel-header-title">
              { panel.title }
            </div>
            { user.id === panel.owner.id &&
              <Button { ...this._getManage() } />
            }
          </div>
        }
        <div className="maha-dashboard-panel-body">
          { panel.cards.map((card, cindex) => (
            <div className={ this._getCardClass(card) } key={`card_${card.id}`}>
              <Card { ...this._getCard(card, cindex) } />
            </div>
          ))}
          { managing &&
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
    const { expanded, managing } = this.state
    const { panel, onExpand } = this.props
    return {
      card,
      index,
      isExpanded: expanded && expanded.card_id === card.id,
      managing,
      panel,
      onExpand,
      onMove: this._handleMove
    }
  }

  _getCardClass(card) {
    const { expanded } = this.props
    const classes = ['maha-dashboard-panel-item']
    if(!expanded) classes.push('one')
    if(expanded && expanded.card_id === card.id) classes.push('full')
    if(expanded && expanded.card_id !== card.id) classes.push('hidden')
    return classes.join(' ')
  }

  _getClass() {
    const { columns } = this.state
    const classes = ['maha-dashboard-panel']
    classes.push(columns)
    return classes.join(' ')
  }

  _getColumns() {
    const { expanded, panel } = this.props
    const { clientWidth } = this.body
    if(expanded && expanded.panel_id !== panel.id) return 'hidden'
    if(clientWidth > 2100) return 'six'
    if(clientWidth > 1750) return 'five'
    if(clientWidth > 1400) return 'four'
    if(clientWidth > 1050) return 'three'
    if(clientWidth > 700) return 'two'
    return 'one'
  }

  _getExpanded() {
    const { expanded, panel } = this.props
    return panel.cards.find(card => {
      return card.id === expanded.card_id
    }) || null
  }

  _getManage() {
    const { managing } = this.state
    const classes = ['maha-dashboard-panel-header-action']
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
