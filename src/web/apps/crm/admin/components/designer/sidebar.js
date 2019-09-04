import Button from './blocks/button'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Text from './blocks/text'
import { unflatten } from 'flat'
import React from 'react'
import Page from './page'
import _ from 'lodash'

class Sidebar extends React.Component {

  static contextTypes = {}

  static propTypes = {
    active: PropTypes.object,
    config: PropTypes.object,
    onUpdate: PropTypes.func
  }

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

  componentDidUpdate(prevProps) {
    const { active } = this.props
    if(!_.isEqual(active, prevProps.active)) {
      if(active.sidebar === null) this._handlePop()
      this._handleEdit()
    }
  }

  _getBlock() {
    const { active, config } = this.props
    const key = `content[${active.section}][${active.block}].config`
    return {
      active,
      config,
      onDone: this._handleDone,
      onUpdate: this._handleUpdate.bind(this, key)
    }
  }

  _getPage() {
    const { config } = this.props
    const key = 'design.page'
    return {
      config,
      onPush: this._handlePush,
      onPop: this._handlePop,
      onUpdate: this._handleUpdate.bind(this, key)
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleEdit() {
    const { active, config } = this.props
    const block = config.content[active.section][active.block]
    if(block.type === 'button') {
      this._handlePush(Button, this._getBlock())
    } else if(block.type === 'text') {
      this._handlePush(Text, this._getBlock())
    } else {
      this._handlePush(() => <div>Foo</div>, {})
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

  _handleUpdate(key, value) {
    const { config } = this.props
    this.props.onUpdate(key, {
      ..._.get(config, key),
      ...unflatten(value)
    })
  }

}

export default Sidebar
