import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Main from './main'
import React from 'react'

class ProductForm extends React.Component {

  static childContextTypes = {
    form: PropTypes.object
  }

  static propTypes = {
    store: PropTypes.object
  }

  static defaultProps = {
  }

  state = {
    cards: []
  }

  _handlePop = this._handlePop.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    const { store } = this.props
    this._handlePush(Main, { store })
  }

  getChildContext() {
    return {
      form: {
        push: this._handlePush,
        pop: this._handlePop
      }
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
      cards: this.state.cards.slice(0, index)
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

export default ProductForm
