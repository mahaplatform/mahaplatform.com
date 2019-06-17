import { ModalPanel, Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import pluralize from 'pluralize'
import Review from '../review'
import Fix from '../fix'

class Validating extends React.Component {

  static contextTypes = {
    network:PropTypes.object
  }

  static propTypes = {
    defaultValue: PropTypes.object,
    error: PropTypes.string,
    import: PropTypes.object,
    fields: PropTypes.array,
    rules: PropTypes.object,
    status: PropTypes.string,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onFail: PropTypes.func,
    onInit: PropTypes.func,
    onOmitErrors: PropTypes.func,
    onPushCard: PropTypes.func,
    onSetImport: PropTypes.func,
    onSuccess: PropTypes.func,
    onUpdateImport: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleFetchImport = this._handleFetchImport.bind(this)
  _handleFixErrorsButton = this._handleFixErrorsButton.bind(this)
  _handleReviewNewButton = this._handleReviewNewButton.bind(this)
  _handleRunImportButton = this._handleRunImportButton.bind(this)
  _handleSkipAllErrorsButton = this._handleSkipAllErrorsButton.bind(this)


  render() {
    const imp = this.props.import
    if(!imp) return null
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="import-validating">
          <div className="import-validating-success">
            <div className="import-validating-success-title">
              Your import has been parsed!
            </div>
            <div>We found...</div>
            <div className="totals-row">
              <div className="value">
                { imp.valid_count }
              </div>
              new { pluralize('record', imp.valid_count) } that will be created.
              { imp.valid_count > 0 &&
                <div className="button-row">
                  <Button { ...this._getReviewNewButton() } />
                </div>
              }
            </div>
            { imp.error_count > 0 &&
              <div className="totals-row">
                <div className="value">
                  { imp.error_count }
                </div>
                { pluralize('record', imp.error_count) } with errors.
                { imp.error_count > 0 &&
                  <div className="button-row">
                    <Button { ...this._getFixErrorsButton() } />
                    <Button { ...this._getSkipAllErrorsButton() } />
                  </div>
                }
              </div>
            }
            { imp.omit_count > 0 &&
              <div className="totals-row">
                <div className="value">
                  { imp.omit_count }
                </div>
                { pluralize('record', imp.omit_count) } will be skipped.
              </div>
            }
            { imp.duplicate_count > 0 &&
              <div className="totals-row">
                <div className="value">
                  { imp.duplicate_count }
                </div>
                { pluralize('record', imp.duplicate_count) } with duplicates that will be { this._getStrategyString(imp.strategy) }.
              </div>
            }
            { imp.nonunique_count > 0 &&
              <div className="totals-row">
                <div className="value">
                  { imp.nonunique_count }
                </div>
                non-unique { pluralize('record', imp.nonunique_count) } within your spreadsheet that will be ignored.
              </div>
            }
            <br />
            { (imp.valid_count > 0 || (imp.duplicate_count > 0 && imp.strategy != 'ignore')) &&
              <Button { ...this._getRunImportButton() } />
            }
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { rules, defaultValue } = this.props
    this.props.onInit( defaultValue )
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  componentDidUpdate(prevProps) {
    const { onDone, status }  = this.props
    if(this.props.import && prevProps.import === null){
      this._handleJoin()
    }
    if(!_.isEqual(this.props.import, prevProps.import) && prevProps.import !== null && status === 'saved') {
      if(this.props.import.stage !== 'processing') return
      onDone(this.props.import)
    }
  }

  _getReviewNewButton() {
    return {
      label: 'Review new records',
      handler: this._handleReviewNewButton
    }
  }

  _getFixErrorsButton() {
    return {
      label: 'Fix errors now',
      handler: this._handleFixErrorsButton
    }
  }

  _getSkipAllErrorsButton() {
    return {
      label: 'Skip all errors',
      handler: this._handleSkipAllErrorsButton
    }
  }

  _getRunImportButton() {
    return {
      label: 'Run Import Now',
      className: 'run-import ui fluid button',
      color: 'green',
      handler: this._handleRunImportButton
    }
  }

  _getStrategyString(strategy) {
    if(strategy === 'ignore') return 'ignored'
    if(strategy === 'overwrite') return 'merged (overwritten)'
    if(strategy === 'dischard') return 'merged (discharded)'
    if(strategy === 'create') return 'created as new'
    return 'handled'
  }

  _getPanel() {
    const { status } = this.props
    const panel = {
      title: 'Validating Import',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
    if(status === 'ready') {
      panel.rightItems = [
        { label: 'Next', handler: this._handleDone }
      ]
    }
    return panel
  }

  _getFix() {
    return {
      defaultValue: this.props.import,
      fields: this.props.fields,
      onBack: this._handleBack.bind(this),
      rules: this.props.rules
    }
  }

  _getReview() {
    return {
      defaultValue: this.props.import,
      onBack: this._handleBack
    }
  }

  _handleJoin() {
    const { network } = this.context
    const channel = `/admin/imports/${this.props.import.id}`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleFetchImport }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const channel = `/admin/imports/${this.props.import.id}`
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleFetchImport }
    ])
  }

  _handleFetchImport() {
    const { id } = this.props.import
    this.props.onFetch(id)
  }

  _handleFixErrorsButton() {
    this.props.onPushCard(Fix, this._getFix.bind(this))
  }

  _handleSkipAllErrorsButton() {
    this.props.onOmitErrors(this.props.import.id)
  }

  _handleReviewNewButton() {
    this.props.onPushCard(Review, this._getReview.bind(this))
  }

  _handleRunImportButton() {
    const { onUpdateImport } = this.props
    onUpdateImport(this.props.import.id, {
      stage: 'processing'
    })
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Validating
