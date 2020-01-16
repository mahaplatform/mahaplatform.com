import { Button, Container, Loader, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import Strategy from './strategy'
import Review from './review'
import Topics from './topics'
import Lists from './lists'
import React from 'react'
import _ from 'lodash'

class Summary extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    _import: PropTypes.object,
    lists: PropTypes.array,
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
  _handleSuccess = this._handleSuccess.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { _import } = this.state
    if(!_import) return <Loader />
    const lists = this._getLists()
    const topics = this._getTopics()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="import-summary">
          <div className="import-summary-item">
            <div className="import-summary-item-icon">
              <div className="import-summary-item-icon-circle">
                <i className="fa fa-fw fa-check" />
              </div>
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
                <div className="import-summary-item-icon-circle">
                  <i className="fa fa-fw fa-times" />
                </div>
              </div>
              <div className="import-summary-item-label">
                { pluralize('record', _import.duplicate_count, true) } will be ignored
              </div>
              <div className="import-summary-item-action">
                <Button { ...this._getStrategyButton() } />
                <Button { ...this._getReviewButton() } />
              </div>
            </div>
          }
          { _import.strategy !== 'ignore' && _import.duplicate_count > 0 &&
            <div className="import-summary-item">
              <div className="import-summary-item-icon">
                <div className="import-summary-item-icon-circle">
                  <i className="fa fa-fw fa-compress" />
                </div>
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
                <div className="import-summary-item-icon-circle">
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
                <div className="import-summary-item-icon-circle">
                  <i className="fa fa-fw fa-minus" />
                </div>
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
              <div className="import-summary-item-icon-circle">
                <i className="fa fa-fw fa-users" />
              </div>
            </div>
            { lists.length > 0 ?
              <div className="import-summary-item-label">
                Contacts will be subscribed to the lists:
                <ul>
                  { lists.map((list, index) => (
                    <li key={`list_${index}`}>
                      { list.program.title } - { list.title }
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
              <div className="import-summary-item-icon-circle">
                <i className="fa fa-fw fa-book" />
              </div>
            </div>
            { topics.length > 0 ?
              <div className="import-summary-item-label">
                Contacts will be marked as interested in the topics:
                <ul>
                  { topics.map((topic, index) => (
                    <li key={`topic_${index}`}>
                      { topic.program.title } - { topic.title }
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
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    console.log('mounting')
    this._handleJoin()
    this._handleFetch()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  _getFixButton() {
    return {
      label: 'Fix Errors',
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
      handler: this._handleEdit.bind(this, Lists)
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

  _getReviewButton() {
    return {
      label: 'Review',
      className: 'ui mini fluid button',
      handler: this._handleReview
    }
  }

  _getSkipButton() {
    return {
      label: 'Skip',
      className: 'ui mini fluid button'
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
      handler: this._handleEdit.bind(this, Topics)
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
    const { onPop } = this.props
    this.props.onPush(component, {
      _import,
      onBack: onPop,
      onDone: this._handleUpdate
    })
  }

  _handleFetch() {
    const { _import } = this.props
    this.context.network.request({
      endpoint: `/api/admin/imports/${_import.id}`,
      method: 'get',
      onSuccess: this._handleSuccess
    })
  }

  _handleJoin() {
    const { network } = this.context
    const { _import } = this.props
    const channel = `/admin/imports/${_import.id}`
    network.join(channel)
    network.subscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave() {
    const { network } = this.context
    const { _import } = this.props
    const channel = `/admin/imports/${_import.id}`
    network.leave(channel)
    network.unsubscribe([
      { target: channel, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleReview() {
    const { _import } = this.state
    const { onPop } = this.props
    this.props.onPush(Review, {
      _import,
      onBack: onPop,
      onDone: onPop
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
  lists: '/api/admin/crm/lists',
  topics: '/api/admin/crm/topics'
})

export default Container(mapResources)(Summary)
