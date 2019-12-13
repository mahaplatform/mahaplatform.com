import PropTypes from 'prop-types'
import Stack from '../stack'
import React from 'react'
import Main from './main'

class Form extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    cancelIcon: PropTypes.string,
    cancelText: PropTypes.string,
    saveIcon: PropTypes.string,
    saveText: PropTypes.string,
    title: PropTypes.string,
    onCancel: PropTypes.func
  }

  static defaultProps = {}

  state = {
    cards: []
  }

  _handlePop =  this._handlePop.bind(this)
  _handlePush =  this._handlePush.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Main, this._getMain.bind(this))
  }

  _getMain() {
    return this.props
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

export default Form
