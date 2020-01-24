import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Preview from './preview'
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
    title: PropTypes.string,
    onAddSection: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onMoveSection: PropTypes.func,
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

  render() {
    return <Stack { ...this._getStack() } />
  }

  componentDidMount() {
    this._handlePush(Page, this._getPage())
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props
    if(!_.isEqual(active, prevProps.active)) {
      if(active.section !== null) this._handleEdit(prevProps.active.section !== null)
      if(active.section === null) this._handlePop()
    }
  }

  _getBlock() {
    const { active, config } = this.props
    const key = `sections[${active.section}].blocks[${active.block}]`
    return {
      config: _.get(config, key),
      onDone: this._handleDone,
      onUpdate: this._handleUpdate.bind(this, key)
    }
  }

  _getPage() {
    const { blocks, cid, components, title, onAddSection, onDeleteSection, onMoveSection, onSave } = this.props
    return {
      blocks,
      cid,
      components,
      title,
      onAddSection,
      onDeleteSection,
      onMoveSection,
      onPush: this._handlePush,
      onPop: this._handlePop,
      onPreview: this._handlePreview,
      onSave,
      onUpdate: this._handleUpdate.bind(this)
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

  _handleDone() {
    this.props.onEdit(null, null)
  }

  _handleEdit(replace) {
    const { active, blocks } = this.props
    const config = this.props.config.sections[active.section].blocks[active.block]
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

  _handleUpdate(key, value) {
    const { config } = this.props
    this.props.onUpdate(key, {
      ..._.get(config, key),
      ...value
    })
  }

}

export default Sidebar
