import React from 'react'
import PropTypes from 'prop-types'
import Stack from '../stack'
import Intro from './intro'
import Upload from './upload'
import Preview from './preview'
import Mapping from './mapping'
import Configure from './configure'
import Parsing from './parsing'
import Validating from './validating'
import Processing from './processing'
import Finalizing from './finalizing'
import Complete from './complete'

class Import extends React.Component {

  static childContextTypes = {
    import: PropTypes.object
  }

  static contextTypes = {
    modal: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    cards: PropTypes.array,
    defaultMapping: PropTypes.array,
    defaultParams: PropTypes.object,
    destination: PropTypes.func,
    import: PropTypes.object,
    fields: PropTypes.array,
    finalizeComponent: PropTypes.any,
    primaryKey: PropTypes.string,
    rules: PropTypes.object,
    status: PropTypes.string,
    table: PropTypes.string,
    onPopCard: PropTypes.func,
    onPushCard: PropTypes.func,
    onSetImport: PropTypes.func,
    onUpdateImport: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleGoPreview = this._handleGoPreview.bind(this)
  _handleGoUpload = this._handleGoUpload.bind(this)
  _handlePushCard = this._handlePushCard.bind(this)

  render() {
    return (
      <Stack { ...this._getStack() } />
    )
  }

  componentDidMount() {
    this._handlePushCard(Intro, this._getIntro())
  }

  getChildContext() {
    return {
      import: {
        fields: this.props.fields,
        defaultParams: this.props.defaultParams
      }
    }
  }

  _getStack() {
    const { cards, fields } = this.props
    return {
      slideFirst: false,
      cards,
      fields
    }
  }

  _getIntro() {
    const { defaultMapping, table } = this.props
    return {
      defaultMapping,
      table,
      onCancel: this._handleCancel,
      onNew: this._handleGoUpload,
      onResume: this._handleDone,
      onPreview: this._handleGoPreview
    }
  }

  _getUpload() {
    return {
      table: this.props.table,
      onBack: this._handleBack,
      onDone: this._handleDone
    }
  }

  _getPreview(defaultValue) {
    const { fields, defaultMapping } = this.props
    return {
      defaultMapping,
      fields,
      defaultValue,
      onBack: this._handleBack,
      onDone: this._handleDone
    }
  }

  _getMapping(defaultValue) {
    const { fields } = this.props
    return {
      fields,
      defaultValue,
      onBack: this._handleBack,
      onPushCard: this._handlePushCard,
      onDone: this._handleDone
    }
  }

  _getConfigure(defaultValue) {
    const { primaryKey } = this.props
    return {
      defaultValue,
      primaryKey,
      onBack: this._handleBack,
      onDone: this._handleDone
    }
  }

  _getParsing(defaultValue) {
    const { table, primaryKey } = this.props
    return {
      defaultValue,
      primaryKey,
      table,
      onBack: this._handleBack,
      onDone: this._handleDone,
      rules: this.props.rules
    }
  }

  _getValidating(defaultValue) {
    return {
      defaultValue,
      rules: this.props.rules,
      fields: this.props.fields,
      onBack: this._handleBack,
      onDone: this._handleDone,
      onPushCard: this._handlePushCard
    }
  }

  _getProcessing(defaultValue) {
    const { table, primaryKey } = this.props
    return {
      defaultValue,
      fields: this.props.fields,
      destination: this.props.destination,
      defaultParams: this.props.defaultParams,
      primaryKey,
      table,
      onBack: this._handleBack,
      onDone: this._handleDone,
      onPushCard: this._handlePushCard
    }
  }

  _getFinalizing(defaultValue) {
    return {
      defaultValue,
      finalizeComponent: this.props.finalizeComponent,
      onDone: this._handleDone,
      onPushCard: this._handlePushCard
    }
  }

  _getComplete(defaultValue) {
    return {
      import: defaultValue,
      destination: this.props.destination,
      onDone: this._handleDone,
      onPushCard: this._handlePushCard
    }
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleBack() {
    this.props.onPopCard()
  }

  _handleGoUpload() {
    this._handlePushCard(Upload, this._getUpload())
  }

  _handleGoPreview() {
    this._handlePushCard(Preview, this._getPreview())
  }

  _handleDone(imp) {
    const { onSetImport, finalizeComponent } = this.props
    onSetImport(imp)
    if(imp.stage === 'previewing') {
      this._handlePushCard(Preview, this._getPreview(imp))
    } else if(imp.stage === 'mapping') {
      this._handlePushCard(Mapping, this._getMapping(imp))
    } else if(imp.stage === 'configuring') {
      this._handlePushCard(Configure, this._getConfigure(imp))
    } else if(imp.stage === 'parsing') {
      this._handlePushCard(Parsing, this._getParsing(imp))
    } else if(imp.stage === 'validating') {
      this._handlePushCard(Validating, this._getValidating(imp))
    } else if(imp.stage === 'processing') {
      this._handlePushCard(Processing, this._getProcessing(imp))
    } else if(imp.stage === 'finalizing' && finalizeComponent) {
      this._handlePushCard(Finalizing, this._getFinalizing(imp))
    } else if(((imp.stage === 'finalizing' && !finalizeComponent)) || imp.stage === 'complete') {
      if(imp.stage === 'finalizing'){
        imp.stage = 'complete'
        onSetImport(imp)
      }
      this._handlePushCard(Complete, this._getComplete(imp))
    }
  }

  _handlePushCard(component, props) {
    this.props.onPushCard({ component, props })
  }

  _handleConfiguring(name, strategy, primary_key) {
    const { id } = this.props.import
    const stage = 'validating'
    this.props.onUpdateImport(id, { stage, name, strategy, primary_key })
  }

}

export default Import
