import { ModalPanel, Search } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Topics extends React.PureComponent {

  static propTypes = {
    defaultValue: PropTypes.array,
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        <Search { ...this._getSearch() } />
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Change Topics',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _getSearch() {
    const { defaultValue } = this.props
    return {
      defaultValue,
      endpoint: '/api/admin/crm/topics',
      multiple: true,
      value: 'id',
      text: 'title',
      onChoose: this._handleChoose
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose() {}

  _handleDone() {
    this.props.onDone()
  }


}

export default Topics
