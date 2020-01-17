import PropTypes from 'prop-types'
import { Container, Image, ModalPanel } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Topics extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    _import: PropTypes.object,
    doneText: PropTypes.string,
    programs: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    channels: [
      { program_id: 1, type: 'email' }
    ]
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    const { programs } = this.props
    const channels = ['sms','phone','postal','email']
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
                { channels.map((type, index) => (
                  <div key={`filter_${index}`} className="maha-search-item" onClick={ this._handleChoose.bind(this, program.id, type) }>
                    <div className="maha-search-item-icon">
                      { this._getChecked(program.id, type) ?
                        <i className="fa fa-fw fa-check-circle" /> :
                        <i className="fa fa-fw fa-circle-o" />
                      }
                    </div>
                    <div className="maha-search-item-label padded">
                      { type }
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
      channels: _import.config.channels || []
    })
  }

  _getChecked(program_id, type) {
    const { channels } = this.state
    return _.find(channels, { program_id, type })
  }

  _getPanel() {
    const { doneText } = this.props
    return {
      title: 'Choose Channels',
      instructions: `Before you can send marketing communications to a contact
        in your database, you first need his/her consent. If you have received
        consent from these contacts, you can opt them into one or more
        communication channels listed below.`,
      leftItems: [
        { icon : 'chevron-left', handler: this._handleCancel }
      ],
      rightItems: [
        { label : doneText, handler: this._handleSave }
      ]
    }
  }

  _handleCancel() {
    this.props.onBack()
  }

  _handleChoose(program_id, type) {
    const { channels } = this.state
    this.setState({
      channels: _.xor(channels, [{ program_id, type }])
    })
  }

  _handleSave() {
    const { channels } = this.state
    const { _import } = this.props
    this.context.network.request({
      endpoint: `/api/admin/imports/${_import.id}`,
      method: 'patch',
      body: {
        config: {
          channels
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
  programs: '/api/admin/crm/programs'
})

export default Container(mapResources)(Topics)
