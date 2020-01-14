import { Button, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import React from 'react'

class Summary extends React.PureComponent {

  static propTypes = {
    _import: PropTypes.object,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { _import } = this.props
    const lists = [{ title: 'one' },{ title: 'two' },{ title: 'three' }]
    const topics = [{ title: 'one' },{ title: 'two' },{ title: 'three' }]
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="import-summary">
          <div className="import-summary-item">
            <div className="import-summary-item-icon">
              <i className="fa fa-fw fa-check-circle" />
            </div>
            <div className="import-summary-item-label">
              { pluralize('new contact', _import.valid_count, true) } will be created
            </div>
            <div className="import-summary-item-action">
              <Button { ...this._getReview() } />
            </div>
          </div>
          { _import.strategy === 'ignore' && _import.duplicate_count > 0 &&
            <div className="import-summary-item">
              <div className="import-summary-item-icon">
                <i className="fa fa-fw fa-times-circle" />
              </div>
              <div className="import-summary-item-label">
                { pluralize('record', _import.duplicate_count, true) } will be ignored
              </div>
              <div className="import-summary-item-action">
                <Button { ...this._getStrategy() } />
              </div>
            </div>
          }
          { _import.strategy !== 'ignore' && _import.duplicate_count > 0 &&
            <div className="import-summary-item">
              <div className="import-summary-item-icon">
                <i className="fa fa-fw fa-compress" />
              </div>
              <div className="import-summary-item-label">
                { pluralize('record', _import.duplicate_count, true) } will be merged, { this._getMerge() }
              </div>
              <div className="import-summary-item-action">
                <Button { ...this._getStrategy() } />
              </div>
            </div>
          }
          { _import.error_count > 0 &&
            <div className="import-summary-item">
              <div className="import-summary-item-icon">
                <i className="fa fa-fw fa-warning" />
              </div>
              <div className="import-summary-item-label">
                { pluralize('record', _import.error_count, true) } have errors
              </div>
              <div className="import-summary-item-action">
                <Button { ...this._getSkip() } />
                <Button { ...this._getFix() } />
              </div>
            </div>
          }
          { _import.omit_count > 0 &&
            <div className="import-summary-item">
              <div className="import-summary-item-icon">
                <i className="fa fa-fw fa-minus-circle" />
              </div>
              <div className="import-summary-item-label">
                { pluralize('record', _import.omit_count, true) } with errors will be skipped
              </div>
              <div className="import-summary-item-action">
                <Button { ...this._getStrategy() } />
              </div>
            </div>
          }
          <div className="import-summary-item">
            <div className="import-summary-item-icon">
              <i className="fa fa-fw fa-users" />
            </div>
            <div className="import-summary-item-label">
              Contacts will be subscribed to the lists:
              <ul>
                { lists.map((list, index) => (
                  <li key={`list_${index}`}>{ list.title }</li>
                )) }
              </ul>
            </div>
            <div className="import-summary-item-action">
              <Button { ...this._getLists() } />
            </div>
          </div>
          <div className="import-summary-item">
            <div className="import-summary-item-icon">
              <i className="fa fa-fw fa-book" />
            </div>
            <div className="import-summary-item-label">
              Contacts will be marked as interested in the topics:
              <ul>
                { topics.map((topic, index) => (
                  <li key={`topic_${index}`}>{ topic.title }</li>
                )) }
              </ul>
            </div>
            <div className="import-summary-item-action">
              <Button { ...this._getTopics() } />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getFix() {
    return {
      label: 'Fix Errors',
      className: 'ui mini button'
    }
  }

  _getLists() {
    return {
      label: 'Change Lists',
      className: 'ui mini button'
    }
  }

  _getMerge() {
    const { strategy } = this.props._import
    if(strategy === 'overwrite') return 'overwriting existing data'
    if(strategy === 'discard') return 'but will not overwrite existing data'
  }

  _getPanel() {
    return {
      title: 'Summary',
      buttons: [
        { label: 'Import Records', color: 'red', handler: this._handleDone  }
      ]
    }
  }

  _getReview() {
    return {
      label: 'Review Records',
      className: 'ui mini button'
    }
  }

  _getSkip() {
    return {
      label: 'Skip All',
      className: 'ui mini button'
    }
  }

  _getStrategy() {
    return {
      label: 'Change Strategy',
      className: 'ui mini button'
    }
  }

  _getTopics() {
    return {
      label: 'Change Topics',
      className: 'ui mini button'
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    const { _import } = this.props
    this.props.onDone(_import)
  }

}

export default Summary
