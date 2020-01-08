import { Infinite, Message, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Members from './members'
import React from 'react'

class Lists extends React.PureComponent {

  static propTypes = {
    source: PropTypes.object,
    onDone: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleCancel = this._handleCancel.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Infinite { ...this._getInfinite() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Choose List',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleCancel }
      ],
      rightItems: [
        { label: 'Next', handler: this._handleDone }
      ]
    }
  }

  _getInfinite() {
    const { source } = this.props
    const empty = {
      icon: 'user',
      title: 'No Lists',
      text: 'There are no lists available'
    }
    return {
      endpoint: `/api/admin/profiles/${source.id}/lists`,
      layout: Results,
      empty: <Message {...empty} />,
      onUpdateSelected: this._handleUpdateSelected,
      props: {
        onChoose: this._handleChoose
      }
    }
  }

  _handleCancel() {
    this.props.onPop()
  }

  _handleChoose(list_id) {
    const { source, onDone, onPop, onPush } = this.props
    this.props.onPush(Members, {
      endpoint: `/api/admin/profiles/${source.id}/lists/${list_id}/members`,
      onDone,
      onPop,
      onPush
    })
  }

}

class Results extends React.PureComponent {

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  _handleChoose = this._handleChoose.bind(this)

  render() {
    const { records } = this.props
    return (
      <div className="contactimport-contacts">
        { records.map((list, index) => (
          <div className="contactimport-contact" key={`contact_${index}`} onClick={ this._handleChoose.bind(this, list)}>
            <div className="contactimport-contact-label">
              { list.name } (
              { list.contact_count } members
              )
            </div>
            <div className="contactimport-contact-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        )) }
      </div>
    )
  }

  _handleChoose(list) {
    this.props.onChoose(list.id)
  }

}

export default Lists
