import { Button, Container, Loader, ModalPanel } from '@admin'
import Organize from '../organize'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Strategy from './strategy'
import Review from './review'
import React from 'react'
import _ from 'lodash'

class Summary extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    _import: PropTypes.object,
    fields: PropTypes.array,
    lists: PropTypes.array,
    programs: PropTypes.array,
    topics: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    _import: null
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)
  _handleEdit = this._handleEdit.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handleReview = this._handleReview.bind(this)
  _handleSkip = this._handleSkip.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { _import } = this.state
    if(!_import) return <Loader />
    const lists = this._getLists()
    const topics = this._getTopics()
    const channels = this._getChannels()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="import-summary">
          <div className="import-summary-item">
            <div className="import-summary-item-icon">
              <div className="import-summary-item-icon-circle green">
                <i className="fa fa-fw fa-check" />
              </div>
            </div>
            <div className="import-summary-item-label">
              { pluralize('new contact', _import.valid_count, true) } will be created
            </div>
            <div className="import-summary-item-action">
              <Button { ...this._getReviewButton({ is_valid: true, is_duplicate: false, is_nonunique: false }) } />
            </div>
          </div>
          { _import.strategy === 'ignore' && _import.duplicate_count > 0 &&
            <div className="import-summary-item">
              <div className="import-summary-item-icon">
                <div className="import-summary-item-icon-circle green">
                  <i className="fa fa-fw fa-times" />
                </div>
              </div>
              <div className="import-summary-item-label">
                { pluralize('duplicate contact', _import.duplicate_count, true) } will be ignored
              </div>
              <div className="import-summary-item-action">
                <Button { ...this._getStrategyButton() } />
                <Button { ...this._getReviewButton({ is_valid: true, is_duplicate: true, is_nonunique: false }) } />
              </div>
            </div>
          }
          { _import.strategy !== 'ignore' && _import.duplicate_count > 0 &&
            <div className="import-summary-item">
              <div className="import-summary-item-icon">
                <div className="import-summary-item-icon-circle green">
                  <i className="fa fa-fw fa-compress" />
                </div>
              </div>
              <div className="import-summary-item-label">
                { pluralize('record', _import.duplicate_count, true) } will be merged, { this._getMerge() }
              </div>
              <div className="import-summary-item-action">
                <Button { ...this._getStrategyButton() } />
                <Button { ...this._getReviewButton({ is_duplicate: true }) } />
              </div>
            </div>
          }
          { _import.empty_count > 0 &&
            <div className="import-summary-item">
              <div className="import-summary-item-icon">
                <div className="import-summary-item-icon-circle green">
                  <i className="fa fa-fw fa-times" />
                </div>
              </div>
              <div className="import-summary-item-label">
                { pluralize('empty record', _import.empty_count, true) } in your input that will be ignored
              </div>
              <div className="import-summary-item-action" />
            </div>
          }
          { _import.nonunique_count > 0 &&
            <div className="import-summary-item">
              <div className="import-summary-item-icon">
                <div className="import-summary-item-icon-circle green">
                  <i className="fa fa-fw fa-times" />
                </div>
              </div>
              <div className="import-summary-item-label">
                { pluralize('nonunique record', _import.nonunique_count, true) } in your input that will be ignored
              </div>
              <div className="import-summary-item-action">
                <Button { ...this._getReviewButton({ is_nonunique: true}) } />
              </div>
            </div>
          }
          { _import.error_count > 0 &&
            <div className="import-summary-item">
              <div className="import-summary-item-icon">
                <div className="import-summary-item-icon-circle red">
                  <i className="fa fa-fw fa-warning" />
                </div>
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
                <div className="import-summary-item-icon-circle red">
                  <i className="fa fa-fw fa-minus" />
                </div>
              </div>
              <div className="import-summary-item-label">
                { pluralize('record', _import.omit_count, true) } with errors will be skipped
              </div>
              <div className="import-summary-item-action">
                <Button { ...this._getReviewButton({ is_valid: false, is_omitted: true }) } />
              </div>
            </div>
          }
          <div className="import-summary-item">
            <div className="import-summary-item-icon">
              <div className="import-summary-item-icon-circle teal">
                <i className="fa fa-fw fa-th-list" />
              </div>
            </div>
            { lists.length > 0 ?
              <div className="import-summary-item-label">
                Contacts will be subscribed to the following lists:
                <ul>
                  { lists.map((list, index) => (
                    <li key={`list_${index}`}>
                      { list.title }
                    </li>
                  )) }
                </ul>
              </div> :
              <div className="import-summary-item-label">
                Contacts will be not be subscribed to any lists
              </div>
            }
            <div className="import-summary-item-action">
              <Button { ...this._getListsButton() } />
            </div>
          </div>
          <div className="import-summary-item">
            <div className="import-summary-item-icon">
              <div className="import-summary-item-icon-circle teal">
                <i className="fa fa-fw fa-lightbulb-o" />
              </div>
            </div>
            { topics.length > 0 ?
              <div className="import-summary-item-label">
                Contacts will be marked as interested in the following topics:
                <ul>
                  { topics.map((topic, index) => (
                    <li key={`topic_${index}`}>
                      { topic.title }
                    </li>
                  )) }
                </ul>
              </div> :
              <div className="import-summary-item-label">
                Contacts will not be marked as interested in any topics
              </div>
            }
            <div className="import-summary-item-action">
              <Button { ...this._getTopicsButton() } />
            </div>
          </div>
          <div className="import-summary-item">
            <div className="import-summary-item-icon">
              <div className="import-summary-item-icon-circle teal">
                <i className="fa fa-fw fa-handshake-o" />
              </div>
            </div>
            { channels.length > 0 ?
              <div className="import-summary-item-label">
                Contacts will be opted in to the following channels:
                <ul>
                  { channels.map((channel, index) => (
                    <li key={`channel_${index}`}>
                      { channel }
                    </li>
                  )) }
                </ul>
              </div> :
              <div className="import-summary-item-label">
                Contacts will not be opted in to any channels
              </div>
            }
            <div className="import-summary-item-action">
              <Button { ...this._getChannelsButton() } />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    this._handleJoin()
    this._handleFetch()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getChannels() {
    const { _import } = this.state
    return _import.config.channels || []
  }

  _getChannelsButton() {
    return {
      label: 'Edit',
      className: 'ui mini fluid button',
      handler: this._handleEdit.bind(this, Organize)
    }
  }

  _getFixButton() {
    return {
      label: 'Fix',
      className: 'ui mini fluid button'
    }
  }

  _getLists() {
    const { _import } = this.state
    const { lists } = this.props
    const { list_ids } = _import.config
    return list_ids ? list_ids.map(id => {
      return _.find(lists, { id })
    }) : []
  }

  _getListsButton() {
    return {
      label: 'Edit',
      className: 'ui mini fluid button',
      handler: this._handleEdit.bind(this, Organize)
    }
  }

  _getMerge() {
    const { _import } = this.state
    const { strategy } = _import
    if(strategy === 'overwrite') return 'overwriting existing data'
    if(strategy === 'discard') return 'but will not overwrite existing data'
  }

  _getPanel() {
    return {
      title: 'Review Import',
      rightItems: [
        { label: 'Next', color: 'red', handler: this._handleDone  }
      ]
    }
  }

  _getReviewButton(params) {
    return {
      label: 'Review',
      className: 'ui mini fluid button',
      handler: this._handleReview.bind(this, params)
    }
  }

  _getSkipButton() {
    return {
      label: 'Skip',
      className: 'ui mini fluid button',
      handler: this._handleSkip
    }
  }

  _getStrategyButton() {
    return {
      label: 'Edit',
      className: 'ui mini fluid button',
      handler: this._handleEdit.bind(this, Strategy)
    }
  }

  _getTopics() {
    const { _import } = this.state
    const { topics } = this.props
    const { topic_ids } = _import.config
    return topic_ids ? topic_ids.map(id => {
      return _.find(topics, { id })
    }) : []
  }

  _getTopicsButton() {
    return {
      label: 'Edit',
      className: 'ui mini fluid button',
      handler: this._handleEdit.bind(this, Organize)
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    const { _import } = this.state
    this.props.onDone(_import)
  }

  _handleEdit(component) {
    const { _import } = this.state
    const { lists, programs, topics, onPop } = this.props
    this.props.onPush(component, {
      _import,
      lists,
      programs,
      topics,
      doneText: 'Done',
      onBack: onPop,
      onDone: this._handleUpdate
    })
  }

  _handleFetch() {
    const { _import } = this.props
    this.context.network.request({
      endpoint: `/api/admin/crm/imports/${_import.id}`,
      method: 'get',
      onSuccess: this._handleSuccess
    })
  }

  _handleJoin() {
    const { network } = this.context
    const { _import } = this.props
    const target = `/admin/imports/${_import.id}`
    network.join(target)
    network.subscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { _import } = this.props
    const target = `/admin/imports/${_import.id}`
    network.leave(target)
    network.unsubscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleReview(params) {
    const { _import } = this.state
    const { fields, onPop } = this.props
    this.props.onPush(Review, {
      _import,
      fields,
      ...params,
      onBack: onPop,
      onDone: onPop
    })
  }

  _handleSkip() {
    const { _import } = this.state
    this.context.network.request({
      endpoint: `/api/admin/imports/${_import.id}/omiterrors`,
      method: 'post'
    })
  }

  _handleSuccess(result) {
    this.setState({
      _import: result.data
    })
  }

  _handleUpdate(_import) {
    this.props.onPop()
  }

}

const mapResources = (props, context) => ({
  fields: '/api/admin/crm/imports/fields',
  lists: '/api/admin/crm/lists',
  programs: '/api/admin/crm/programs',
  topics: '/api/admin/crm/topics'
})

export default Container(mapResources)(Summary)
