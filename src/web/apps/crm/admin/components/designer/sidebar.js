import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Page from './page'

class Sidebar extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {}

  static defaultProps = {}

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="designer-sidebar">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Page, this._getPage())
  }

  _getPage() {
    return {
      onPush: this._handlePush,
      onPop: this._handlePop
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

}

export default Sidebar
