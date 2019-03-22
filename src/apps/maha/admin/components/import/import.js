import React from 'react'
import PropTypes from 'prop-types'
import { Stack } from 'maha-admin'
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
    const { onPushCard } = this.props
    onPushCard({ component: (props) => <Intro { ...props } { ...this._getIntro() } /> })
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

  _getPreview() {
    const { fields, defaultMapping } = this.props
    return {
      defaultMapping,
      fields,
      defaultValue: this.props.import,
      onBack: this._handleBack,
      onDone: this._handleDone
    }
  }

  _getMapping() {
    const { fields } = this.props
    return {
      fields,
      defaultValue: this.props.import,
      onBack: this._handleBack,
      onPushCard: this._handlePushCard,
      onDone: this._handleDone
    }
  }

  _getConfigure() {
    const { primaryKey } = this.props
    return {
      defaultValue: this.props.import,
      primaryKey,
      onBack: this._handleBack,
      onDone: this._handleDone
    }
  }

  _getParsing() {
    const { table, primaryKey } = this.props
    return {
      defaultValue: this.props.import,
      primaryKey,
      table,
      onBack: this._handleBack,
      onDone: this._handleDone,
      rules: this.props.rules
    }
  }

  _getValidating() {
    return {
      defaultValue: this.props.import,
      rules: this.props.rules,
      fields: this.props.fields,
      onBack: this._handleBack,
      onDone: this._handleDone,
      onPushCard: this._handlePushCard
    }
  }

  _getProcessing() {
    const { table, primaryKey } = this.props
    return {
      defaultValue: this.props.import,
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

  _getFinalizing() {
    return {
      defaultValue: this.props.import,
      finalizeComponent: this.props.finalizeComponent,
      onDone: this._handleDone,
      onPushCard: this._handlePushCard
    }
  }

  _getComplete() {
    return {
      import: this.props.import,
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
    this._handlePushCard(Upload, this._getUpload.bind(this))
  }

  _handleGoPreview() {
    this._handlePushCard(Preview, this._getPreview.bind(this))
  }

  _handleDone(imp) {
    const { onSetImport, onPopCard, finalizeComponent } = this.props
    onSetImport(imp)
    if(imp.stage === 'previewing') {
      this._handlePushCard(Preview, this._getPreview.bind(this))
    } else if(imp.stage === 'mapping') {
      this._handlePushCard(Mapping, this._getMapping.bind(this))
    } else if(imp.stage === 'configuring') {
      this._handlePushCard(Configure, this._getConfigure.bind(this))
    } else if(imp.stage === 'parsing') {
      this._handlePushCard(Parsing, this._getParsing.bind(this))
    } else if(imp.stage === 'validating') {
      this._handlePushCard(Validating, this._getValidating.bind(this))
    } else if(imp.stage === 'processing') {
      this._handlePushCard(Processing, this._getProcessing.bind(this))
    } else if(imp.stage === 'finalizing' && finalizeComponent) {
      this._handlePushCard(Finalizing, this._getFinalizing.bind(this))
    } else if(((imp.stage === 'finalizing' && !finalizeComponent)) || imp.stage === 'complete') {
      if(imp.stage === 'finalizing'){
        imp.stage = 'complete'
        onSetImport(imp)
      }
      this._handlePushCard(Complete, this._getComplete.bind(this))
    }
  }

  _handlePushCard(Component, config) {
    const { onPushCard } = this.props
    onPushCard({ component: (props) => <Component { ...props } { ...config() } /> })
  }

  _handleConfiguring(name, strategy, primary_key) {
    const { id } = this.props.import
    const stage = 'validating'
    this.props.onUpdateImport(id, { stage, name, strategy, primary_key })
  }

}

export default Import
