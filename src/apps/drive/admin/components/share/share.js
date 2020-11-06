import { Stack } from '@admin'
import Methods from './methods'
import PropTypes from 'prop-types'
import Email from './email'
import Chat from './chat'
import Link from './link'
import React from 'react'

class Share extends React.Component {

  static contextTypes = {
    flash: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    active: PropTypes.number,
    item: PropTypes.object,
    methods: PropTypes.array,
    method: PropTypes.object,
    onChooseMethod: PropTypes.func,
    onSetMethods: PropTypes.func
  }

  _handleChooseMethod = this._handleChooseMethod.bind(this)

  render() {
    return (
      <div className="drive-share">
        <Stack cards={ this._getCards() } />
      </div>
    )
  }

  componentDidMount() {
    const methods = [
      { icon: 'envelope', label: 'email', component: Email },
      { icon: 'comment', label: 'chat', component: Chat },
      { icon: 'link', label: 'link', component: Link }
    ]
    this.props.onSetMethods(methods)
  }

  _getCards() {
    const { method } = this.props
    const cards = [
      { component: () => <Methods { ...this._getMethods() } /> }
    ]
    if(method) cards.push({ component: () => <method.component { ...this._getMethod() } /> })
    return cards
  }

  _getMethods() {
    const { item, methods } = this.props
    return {
      item,
      methods,
      onChooseMethod: this._handleChooseMethod
    }
  }

  _getMethod() {
    const { item } = this.props
    return {
      item,
      onBack: this._handleChooseMethod
    }
  }

  _handleChooseMethod(index) {
    this.props.onChooseMethod(index)
  }

}

export default Share
