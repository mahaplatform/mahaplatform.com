import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Preview from './preview'
import Tokens from './tokens'
import React from 'react'
import Page from './page'
import _ from 'lodash'

class Sidebar extends React.Component {

  static propTypes = {
    active: PropTypes.object,
    blocks: PropTypes.array,
    components: PropTypes.object,
    cid: PropTypes.string,
    config: PropTypes.object,
    endpoint: PropTypes.string,
    program_id: PropTypes.number,
    status: PropTypes.string,
    title: PropTypes.string,
    tokens: PropTypes.array,
    onEdit: PropTypes.func,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePreview = this._handlePreview.bind(this)
  _handlePush = this._handlePush.bind(this)
  _handleReplace = this._handleReplace.bind(this)
  _handleTokens = this._handleTokens.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Page, this._getPage())
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props
    if(!_.isEqual(active, prevProps.active)) {
      if(active.index !== null) this._handleEdit(prevProps.active.index !== null)
      if(active.index === null) this._handlePop()
    }
  }

  _getBlock() {
    const { active, config } = this.props
    const key = `[${active.section}].blocks[${active.index}]`
    return {
      config: _.get(config, key),
      onDone: this._handleDone,
      onTokens: this._handleTokens,
      onUpdate: this._handleUpdate.bind(this, key)
    }
  }

  _getPage() {
    const { blocks, cid, components, endpoint, program_id, status, title, onSave } = this.props
    return {
      blocks,
      cid,
      components,
      endpoint,
      program_id,
      status,
      title,
      onPush: this._handlePush,
      onPop: this._handlePop,
      onPreview: this._handlePreview,
      onSave,
      onTokens: this._handleTokens,
      onUpdate: this._handleUpdate
    }
  }

  _getPreview() {
    const { cid } = this.props
    return {
      cid,
      onBack: this._handlePop
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _getTokens() {
    const { tokens } = this.props
    return {
      tokens,
      onPop: this._handlePop
    }
  }

  _handleDone() {
    this.props.onEdit(null, null)
  }

  _handleEdit(replace) {
    const { active, blocks } = this.props
    const config = this.props.config[active.section].blocks[active.index]
    const { type } = config
    const block = _.find(blocks, { type })
    const push = replace ? this._handleReplace : this._handlePush
    push(block.component, this._getBlock())
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handlePreview() {
    this._handlePush(Preview, this._getPreview())
  }

  _handleReplace(component, props) {
    this._handlePop()
    setTimeout(this._handlePush.bind(this, component, props), 300)
  }

  _handlePush(component, props) {
    this.setState({
      cards: [
        ...this.state.cards,
        { component, props }
      ]
    })
  }

  _handleTokens() {
    this._handlePush(Tokens, this._getTokens())
  }

  _handleUpdate(key, value) {
    const { config } = this.props
    this.props.onUpdate(key, {
      ..._.get(config, key),
      ...value
    })
  }

}

export default Sidebar
