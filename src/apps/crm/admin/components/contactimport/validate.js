import { Button, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

class Validate extends React.PureComponent {

  static propTypes = {
    _import: PropTypes.object,
    onDone: PropTypes.func
  }

  _handleDone = this._handleDone.bind(this)

  render() {
    const { _import } = this.props
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
                { _import.valid_count }
              </div>
              new { pluralize('record', _import.valid_count) } that will be created.
              { _import.valid_count > 0 &&
                <div className="button-row">
                  <Button { ...this._getReviewNewButton() } />
                </div>
              }
            </div>
            { _import.error_count > 0 &&
              <div className="totals-row">
                <div className="value">
                  { _import.error_count }
                </div>
                { pluralize('record', _import.error_count) } with errors.
                { _import.error_count > 0 &&
                  <div className="button-row">
                    <Button { ...this._getFixErrorsButton() } />
                    <Button { ...this._getSkipAllErrorsButton() } />
                  </div>
                }
              </div>
            }
            { _import.omit_count > 0 &&
              <div className="totals-row">
                <div className="value">
                  { _import.omit_count }
                </div>
                { pluralize('record', _import.omit_count) } will be skipped.
              </div>
            }
            { _import.duplicate_count > 0 &&
              <div className="totals-row">
                <div className="value">
                  { _import.duplicate_count }
                </div>
                { pluralize('record', _import.duplicate_count) } with duplicates that will be { this._getStrategy() }.
              </div>
            }
            { _import.nonunique_count > 0 &&
              <div className="totals-row">
                <div className="value">
                  { _import.nonunique_count }
                </div>
                non-unique { pluralize('record', _import.nonunique_count) } within your spreadsheet that will be ignored.
              </div>
            }
            <br />
            { (_import.valid_count > 0 || (_import.duplicate_count > 0 && _import.strategy != 'ignore')) &&
              <Button { ...this._getRunImportButton() } />
            }
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getFixErrorsButton() {
    return {
      label: 'Fix Errors'
    }
  }

  _getPanel() {
    return {
      title: 'Validating'
    }
  }

  _getReviewNewButton() {
    return {
      label: 'Review New Contacts'
    }
  }

  _getRunImportButton() {
    return {
      label: 'Import Now',
      handler: this._handleDone
    }
  }

  _getSkipAllErrorsButton() {
    return {
      label: 'Skip all errors'
    }
  }

  _getStrategy() {
    const { strategy } = this.props._import
    if(strategy === 'ignore') return 'ignored'
    if(strategy === 'overwrite') return 'merged (overwritten)'
    if(strategy === 'dischard') return 'merged (discharded)'
    if(strategy === 'create') return 'created as new'
    return 'handled'
  }

  _handleDone() {
    const { _import } = this.props
    this.props.onDone(_import)
  }

}

export default Validate
