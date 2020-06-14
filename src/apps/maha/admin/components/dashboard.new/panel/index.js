import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import New from './card/new'
import React from 'react'
import Card from './card'

class Panel extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    panel: PropTypes.object,
    onToggle: PropTypes.func
  }

  state = {
    reordering: false
  }

  _handleReorder = this._handleReorder.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { user } = this.context.admin
    const { panel } = this.props
    return (
      <div className="maha-dashboard-body">
        <div className="maha-dashboard-header">
          <div className="maha-dashboard-header-toggle" onClick={ this._handleToggle }>
            <i className="fa fa-bars" />
          </div>
          <div className="maha-dashboard-header-body">
            { panel.title }
          </div>
          { user.id === panel.owner.id &&
            <Button { ...this._getReorder() } />
          }
          { user.id === panel.owner.id &&
            <Button { ...this._getAdd() } />
          }
        </div>
        <div className="maha-dashboard-panel">
          { panel.cards.map((card, cindex) => (
            <div className="maha-dashboard-panel-item" key={`tab_${card.id}`}>
              <Card { ...this._getCard(panel, card) } />
            </div>
          ))}
        </div>
      </div>
    )
  }

  _getAdd() {
    const { panel } = this.props
    return {
      label: <i className="fa fa-plus" />,
      className: 'maha-dashboard-header-action',
      modal: <New panel={ panel } />
    }
  }

  _getCard(panel, card) {
    const { reordering } = this.state
    return {
      card,
      panel,
      reordering
    }
  }

  _getReorder() {
    const { reordering } = this.state
    const classes = ['maha-dashboard-header-action']
    if(reordering) classes.push('active')
    return {
      label: <i className="fa fa-arrows" />,
      className: classes.join(' '),
      handler: this._handleReorder
    }
  }

  _handleAdd() {}

  _handleReorder() {
    const { reordering } = this.state
    this.setState({
      reordering: !reordering
    })
  }

  _handleToggle() {
    this.props.onToggle()
  }

}

export default Panel
