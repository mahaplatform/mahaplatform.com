import PropTypes from 'prop-types'
import { Container, ModalPanel } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Topics extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    _import: PropTypes.object,
    topics: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    topic_ids: []
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { topics } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-search-options">
          <div className="maha-search-results">
            { topics.map((topic, index) => (
              <div key={`filter_${index}`} className="maha-search-item" onClick={ this._handleChoose.bind(this, topic.id) }>
                <div className="maha-search-item-label padded">
                  { topic.title }
                </div>
                <div className="maha-search-item-icon">
                  { this._getChecked(topic.id) &&
                    <i className="fa fa-fw fa-check" />
                  }
                </div>
              </div>
            )) }
          </div>
        </div>
      </ModalPanel>
    )
  }

  componentDidMount() {
    const { _import } = this.props
    if(_import.config) this.setState({
      topic_ids: _import.config.topic_ids || []
    })
  }

  _getChecked(id) {
    const { topic_ids } = this.state
    return _.includes(topic_ids, id)
  }

  _getPanel() {
    return {
      title: 'Choose Topics',
      leftItems: [
        { icon : 'chevron-left', handler: this._handleCancel }
      ],
      rightItems: [
        { label : 'Done', handler: this._handleSave }
      ]
    }
  }

  _handleCancel() {
    this.props.onBack()
  }

  _handleChoose(id) {
    const { topic_ids } = this.state
    this.setState({
      topic_ids: _.xor(topic_ids, [id])
    })
  }

  _handleSave() {
    const { topic_ids } = this.state
    const { _import } = this.props
    this.context.network.request({
      endpoint: `/api/admin/imports/${_import.id}`,
      method: 'patch',
      body: {
        config: {
          topic_ids
        }
      },
      onSuccess: this._handleDone
    })
  }

  _handleDone(_import) {
    this.props.onDone(_import)
  }

}

const mapResources = (props, context) => ({
  topics: '/api/admin/crm/topics'
})

export default Container(mapResources)(Topics)
