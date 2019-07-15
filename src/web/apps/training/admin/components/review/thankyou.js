import { Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Question extends React.PureComponent {

  static contextTypes = {
    modal: PropTypes.object
  }

  static propTypes = {}

  static defaultProps = {}

  _handleDone = this._handleDone.bind(this)

  render() {
    return (
      <div className="review-question">
        <div className="review-question-body">
          <div className="review-question-inner">
            <div className="review-question-icon">
              <i className="fa fa-thumbs-up" />
            </div>
            <div className="review-question-text">
              Thank you for your feedback!
            </div>
            <div className="review-question-button">
              <Button { ...this._getButton() } />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getButton() {
    return {
      label: 'Close Window',
      className: 'ui white basic button',
      handler: this._handleDone
    }
  }

  _handleDone() {
    this.context.modal.close()
  }

}

export default Question
