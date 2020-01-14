import { Button, Container, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Review from './review'
import Topics from './topics'
import Lists from './lists'
import React from 'react'
import _ from 'lodash'

class Summary extends React.PureComponent {

  static propTypes = {
    _import: PropTypes.object,
    lists: PropTypes.array,
    topics: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleReview = this._handleReview.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { _import } = this.props
    const lists = this._getLists()
    const topics = this._getTopics()
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
              <Button { ...this._getReviewButton() } />
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
                <Button { ...this._getStrategyButton() } />
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
                <Button { ...this._getStrategyButton() } />
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
                <Button { ...this._getSkipButton() } />
                <Button { ...this._getFixButton() } />
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
                <Button { ...this._getStrategyButton() } />
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
              <Button { ...this._getListsButton() } />
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
              <Button { ...this._getTopicsButton() } />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getFixButton() {
    return {
      label: 'Fix Errors',
      className: 'ui mini button'
    }
  }

  _getLists() {
    const { _import, lists } = this.props
    return _import.config.list_ids.map(id => {
      return _.find(lists, { id })
    })
  }

  _getListsButton() {
    return {
      label: 'Change Lists',
      className: 'ui mini button',
      handler: this._handleEdit.bind(this, Lists, this._getLists.bind(this))
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

  _getReviewButton() {
    return {
      label: 'Review Records',
      className: 'ui mini button',
      handler: this._handleReview
    }
  }

  _getSkipButton() {
    return {
      label: 'Skip All',
      className: 'ui mini button'
    }
  }

  _getStrategyButton() {
    return {
      label: 'Change Strategy',
      className: 'ui mini button'
    }
  }

  _getTopics() {
    const { _import, topics } = this.props
    return _import.config.topic_ids.map(id => {
      return _.find(topics, { id })
    })
  }

  _getTopicsButton() {
    return {
      label: 'Change Topics',
      className: 'ui mini button',
      handler: this._handleEdit.bind(this, Topics, this._getTopics.bind(this))
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    const { _import } = this.props
    this.props.onDone(_import)
  }

  _handleEdit(component, defaultValue) {
    const { onPop } = this.props
    this.props.onPush(component, {
      defaultValue: defaultValue(),
      onBack: onPop,
      onDone: this._handleUpdate
    })
  }

  _handleReview() {
    const { onPop } = this.props
    this.props.onPush(Review, {
      onBack: onPop,
      onDone: onPop
    })
  }

  _handleUpdate(_import) {
    this.props.onPop()
  }

}

const mapResources = (props, context) => ({
  lists: '/api/admin/crm/lists',
  topics: '/api/admin/crm/topics'
})

export default Container(mapResources)(Summary)
