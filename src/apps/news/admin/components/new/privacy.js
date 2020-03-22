import { Infinite, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Groups from './groups'
import React from 'react'

class Privacy extends React.Component {

  static propTypes = {
    onBack: PropTypes.func,
    onChoose: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleChoose = this._handleChoose.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel()}>
        <Infinite { ...this._getInfinite() } />
      </ModalPanel>
    )
  }

  _getInfinite() {
    return {
      endpoint: '/api/admin/news/groups',
      layout: Groups,
      props: {
        onChoose: this._handleChoose
      }
    }
  }

  _getPanel() {
    return {
      title: 'Share With',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleChoose(group) {
    this.props.onChoose(group)
    this.props.onBack()
  }

}

export default Privacy
