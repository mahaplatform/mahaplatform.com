import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Page from './page'
import React from 'react'
import _ from 'lodash'

class Sidebar extends React.Component {

  static propTypes = {
    active: PropTypes.number,
    cid: PropTypes.string,
    config: PropTypes.object,
    fields: PropTypes.array,
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
    if(active !== prevProps.active) {
      if(active !== null) this._handleEdit(prevProps.active !== null)
      if(active === null) this._handlePop()
    }
  }

  _getField() {
    const { active, config } = this.props
    const key = `fields[${active.block}]`
    return {
      config: _.get(config, key),
      onDone: this._handleDone,
      onUpdate: this._handleUpdate.bind(this, key)
    }
  }
  
  _getPage() {
    const { cid, fields, onSave } = this.props
    return {
      cid,
      fields,
      onSave,
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

  _handleDone() {
    this.props.onEdit(null, null)
  }

  _handleEdit(replace) {
    const { active, fields } = this.props
    const config = this.props.config.fields[active]
    const { type } = config
    const field = _.find(fields, { type })
    const push = replace ? this._handleReplace : this._handlePush
    push(field.component, this._getField())
  }

  _handlePop(index = -1) {
    this.setState({
      cards:this.state.cards.slice(0, index)
    })
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
