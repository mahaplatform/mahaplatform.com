import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import Form from './form'

class New extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.array,
    group_id: PropTypes.number,
    status: PropTypes.string,
    text: PropTypes.string,
    user_id: PropTypes.number,
    onSave: PropTypes.func
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
    this._handlePush(Form, this._getForm())
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props
    if(status !== prevProps.status) {
      if(status === 'success') {
        this.context.modal.close()
      }
    }
  }

  _getForm() {
    return {
      ...this.props,
      onPop: this._handlePop,
      onPush: this._handlePush
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

export default New
