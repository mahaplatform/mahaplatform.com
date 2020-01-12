import Attachment from './attachment'
import { Stack } from 'maha-admin'
import PropTypes from 'prop-types'
import Mappings from './mappings'
import Preview from './preview'
import Import from './import'
import React from 'react'

class File extends React.PureComponent {

  static propTypes = {
    source: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    cards: []
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleImport = this._handleImport.bind(this)
  _handleMappings = this._handleMappings.bind(this)
  _handlePop = this._handlePop.bind(this)
  _handlePreview = this._handlePreview.bind(this)
  _handlePush = this._handlePush.bind(this)

  render() {
    return (
      <div className="contactimport">
        <Stack { ...this._getStack() } />
      </div>
    )
  }

  componentDidMount() {
    this._handlePush(Attachment, this._getAttachment())
  }

  _getAttachment() {
    return {
      onBack: this._handleBack,
      onDone: this._handlePreview
    }
  }

  _getImport(asset, parse, mapping) {
    return {
      asset,
      parse,
      mapping,
      onDone: this._handleDone
    }
  }

  _getMappings(asset, parse, headers) {
    return {
      asset,
      parse,
      headers,
      onPop: this._handlePop,
      onPush: this._handlePush,
      onBack: this._handlePop,
      onDone: this._handleImport
    }
  }

  _getPreview(asset) {
    return {
      asset,
      onBack: this._handlePop,
      onDone: this._handleMappings
    }
  }

  _getStack() {
    const { cards } = this.state
    return {
      cards,
      slideFirst: false
    }
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleImport(asset, parse, mapping) {
    this._handlePush(Import, this._getImport(asset, parse, mapping))
  }

  _handleMappings(asset, parse, headers) {
    this._handlePush(Mappings, this._getMappings(asset, parse, headers))
  }

  _handleDone(_import) {
    this.props.onDone(_import)
  }

  _handlePop(index = -1) {
    this.setState({
      cards: this.state.cards.slice(0, index)
    })
  }

  _handlePreview(asset) {
    this._handlePush(Preview, this._getPreview(asset))
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

export default File
