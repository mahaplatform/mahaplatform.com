import { ModalPanel, Search } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Review extends React.PureComponent {

  static propTypes = {
    onBack: PropTypes.func,
    onDone: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <ModalPanel { ...this._getPanel() }>
        review
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Review Records',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ],
      rightItems: [
        { label: 'Done', handler: this._handleDone }
      ]
    }
  }

  _handleBack() {
    this.props.onBack()
  }

  _handleDone() {
    this.props.onDone()
  }

}

export default Review
