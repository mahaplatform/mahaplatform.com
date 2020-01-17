import PropTypes from 'prop-types'
import { Image, ModalPanel } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Topics extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    _import: PropTypes.object,
    doneText: PropTypes.string,
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
    const programs = this._getPrograms()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-search-options">
          <div className="maha-search-results">
            { programs.map((program, index) => (
              <div className="maha-search-segment" key={`segment_${index}`}>
                <div className="maha-search-segment-title">
                  <Image src={ program.logo } title={ program.title } transforms={{ w: 24, h: 24 }} />
                  { program.title }
                </div>
                { program.topics.map((topic, index) => (
                  <div key={`filter_${index}`} className="maha-search-item" onClick={ this._handleChoose.bind(this, topic.id) }>
                    <div className="maha-search-item-icon">
                      { this._getChecked(topic.id) ?
                        <i className="fa fa-fw fa-check-circle" /> :
                        <i className="fa fa-fw fa-circle-o" />
                      }
                    </div>
                    <div className="maha-search-item-label padded">
                      { topic.title }
                    </div>
                  </div>
                )) }
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
    const { doneText } = this.props
    return {
      title: 'Choose Topics',
      instructions: `Contacts can be organized into groups based on their
        interest in one or more topics. Each contact has a public interface
        where they can adjust these interests or opt out of communications
        entirely. Choose one or more topics from below to which you'd like to
        add these contacts.`,
      leftItems: [
        { icon : 'chevron-left', handler: this._handleCancel }
      ],
      rightItems: [
        { label : doneText, handler: this._handleSave }
      ]
    }
  }

  _getPrograms() {
    const { topics } = this.props
    return Object.values(topics.reduce((programs, topic) => ({
      ...programs,
      [topic.program.id]: {
        ...topic.program,
        topics: [
          ...programs[topic.program.id] ? programs[topic.program.id].topics : [],
          topic
        ]
      }
    }), {}))
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

export default Topics
