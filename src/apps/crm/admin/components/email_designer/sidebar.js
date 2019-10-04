import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Preview from './preview'
import Block from './block'
import React from 'react'
import Page from './page'
import _ from 'lodash'

class Sidebar extends React.Component {

  static contextTypes = {}

  static propTypes = {
    active: PropTypes.object,
    cid: PropTypes.string,
    config: PropTypes.object,
    onAddSection: PropTypes.func,
    onDeleteSection: PropTypes.func,
    onMoveSection: PropTypes.func,
    onEdit: PropTypes.func,
    onSave: PropTypes.func,
    onUpdate: PropTypes.func
  }

  static defaultProps = {}

  state = {
    cards: []
  }

  _handleDone = this._handleDone.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePreview = this._handlePreview.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="email-designer-sidebar">
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
      if(active.section === null) return this._handlePop()
      this._handleEdit()
    }
  }

  _getBlock() {
    const { active, cid, config } = this.props
    const block = config.sections[active.section].blocks[active.block]
    const key = `sections[${active.section}].blocks[${active.block}]`
    return {
      active,
      block,
      cid,
      config: _.get(config, key),
      onDone: this._handleDone,
      onUpdate: this._handleUpdate.bind(this, key)
    }
  }

  _getPage() {
    const { cid, onAddSection, onDeleteSection, onMoveSection, onSave } = this.props
    return {
      cid,
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

  _handleEdit() {
    this._handlePush(Block, this._getBlock())
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
  }

  _handlePreview() {
    this._handlePush(Preview, this._getPreview())
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
