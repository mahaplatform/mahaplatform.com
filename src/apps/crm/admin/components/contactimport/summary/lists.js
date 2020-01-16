import PropTypes from 'prop-types'
import { Container, Image, ModalPanel } from 'maha-admin'
import React from 'react'
import _ from 'lodash'

class Lists extends React.PureComponent {

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    _import: PropTypes.object,
    lists: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  state = {
    list_ids: []
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
                { program.lists.map((list, index) => (
                  <div key={`filter_${index}`} className="maha-search-item" onClick={ this._handleChoose.bind(this, list.id) }>
                    <div className="maha-search-item-icon">
                      { this._getChecked(list.id) ?
                        <i className="fa fa-fw fa-check-circle" /> :
                        <i className="fa fa-fw fa-circle-o" />
                      }
                    </div>
                    <div className="maha-search-item-label padded">
                      { list.title }
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
      list_ids: _import.config.list_ids || []
    })
  }

  _getChecked(id) {
    const { list_ids } = this.state
    return _.includes(list_ids, id)
  }

  _getPanel() {
    return {
      title: 'Choose Lists',
      leftItems: [
        { icon : 'chevron-left', handler: this._handleCancel }
      ],
      rightItems: [
        { label : 'Done', handler: this._handleSave }
      ]
    }
  }

  _getPrograms() {
    const { lists } = this.props
    return Object.values(lists.reduce((programs, list) => ({
      ...programs,
      [list.program.id]: {
        ...list.program,
        lists: [
          ...programs[list.program.id] ? programs[list.program.id].lists : [],
          list
        ]
      }
    }), {}))
  }

  _handleCancel() {
    this.props.onBack()
  }

  _handleChoose(id) {
    const { list_ids } = this.state
    this.setState({
      list_ids: _.xor(list_ids, [id])
    })
  }

  _handleSave() {
    const { list_ids } = this.state
    const { _import } = this.props
    this.context.network.request({
      endpoint: `/api/admin/imports/${_import.id}`,
      method: 'patch',
      body: {
        config: {
          list_ids
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
  lists: '/api/admin/crm/lists'
})

export default Container(mapResources)(Lists)
